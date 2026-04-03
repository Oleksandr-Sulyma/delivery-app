'use client';

import {
  Row,
  Col,
  Form,
  Input,
  Card,
  Button,
  Typography,
  Flex,
  InputNumber,
  Empty,
  Modal,
  theme,
} from 'antd';
import { useCartStore } from '@/store/useCartStore';
import { orderService, couponService } from '@/services/api';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiftOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CartClient() {
  const { token } = theme.useToken();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    appliedCoupon,
    applyCoupon,
  } = useCartStore();

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsVerifying(true);
    try {
      const data = await couponService.validate(couponInput);
      applyCoupon({ code: couponInput, discount: data.discount });
      toast.success(`Coupon applied! -${data.discount}%`);
      setCouponInput('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
      applyCoupon(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOrderSubmit = async (values: any) => {
    const hasUnavailableItems = cart.some((item) => item.isAvailable === false);
    if (hasUnavailableItems) {
      toast.error('Please remove unavailable items from your cart.');
      return;
    }
    setIsSubmitting(true);
    try {
      const cleanPhone = `+380${values.phone.replace(/-/g, '')}`;
      const orderData = {
        user: { ...values, phone: cleanPhone },
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalPrice: getTotalPrice(),
        couponCode: appliedCoupon?.code || null,
      };
      const response = await orderService.createOrder(orderData);
      Modal.success({
        title: 'Order Placed!',
        centered: true,
        content: (
          <Text>
            Order ID: <strong>{response._id}</strong>
          </Text>
        ),
        onOk: () => {
          clearCart();
          router.push('/');
        },
      });
    } catch (error: any) {
      toast.error('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ minHeight: '60vh' }}
      >
        <Empty description="Your shopping cart is empty" />
        <Button
          type="primary"
          size="large"
          onClick={() => router.push('/')}
          style={{ marginTop: 20 }}
        >
          Back to Shop
        </Button>
      </Flex>
    );
  }

return (
    <main style={{ minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <Flex vertical gap="large">
              <Card
                title="Delivery Info"
                className="app-card-interactive"
                style={{
                  background: token.colorBgContainer,
                }}
              >
                <Form
                  form={form}
                  id="order-form"
                  layout="vertical"
                  onFinish={handleOrderSubmit}
                  requiredMark={false}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input placeholder="example@mail.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true, pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/ },
                    ]}
                  >
                    <Input
                      prefix="+380"
                      placeholder="99-555-55-55"
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        const cleanVal = val.slice(0, 9);
                        let formatted = cleanVal;
                        if (cleanVal.length > 2)
                          formatted = `${cleanVal.slice(0, 2)}-${cleanVal.slice(2)}`;
                        if (cleanVal.length > 5)
                          formatted = `${formatted.slice(0, 6)}-${cleanVal.slice(5, 7)}-${cleanVal.slice(7, 9)}`;
                        form.setFieldsValue({ phone: formatted });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input.TextArea
                      placeholder="Enter full address"
                      rows={3}
                      style={{ resize: 'none' }}
                    />
                  </Form.Item>
                </Form>
              </Card>

              <Card
                size="small"
                className="app-card-interactive"
                style={{
                  background: token.colorBgContainer,
                }}
              >
                <Flex vertical gap="small">
                  <Text strong>
                    <GiftOutlined /> Apply Coupon
                  </Text>
                  {!appliedCoupon ? (
                    <Flex gap="small">
                      <Input
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) =>
                          setCouponInput(e.target.value.toUpperCase())
                        }
                      />
                      <Button
                        type="primary"
                        onClick={handleApplyCoupon}
                        loading={isVerifying}
                      >
                        Apply
                      </Button>
                    </Flex>
                  ) : (
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        background: token.colorSuccessBg,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: `1px solid ${token.colorSuccessBorder}`,
                      }}
                    >
                      <Text type="success">
                        <strong>{appliedCoupon.code}</strong> (-
                        {appliedCoupon.discount}%)
                      </Text>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => applyCoupon(null)}
                      />
                    </Flex>
                  )}
                </Flex>
              </Card>
            </Flex>
          </Col>

          <Col xs={24} lg={14}>
            <Card
              className="app-card-interactive active"
              styles={{
                header: {
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  background: token.colorBgContainer,
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                },
                body: {
                  padding: '20px',
                },
              }}
              title={
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ width: '100%' }}
                >
                  <span>Review Your Order</span>
                  <Text
                    strong
                    style={{ color: token.colorPrimary, fontSize: '20px' }}
                  >
                    {getTotalPrice()} UAH
                  </Text>
                </Flex>
              }
              style={{
                background: token.colorBgContainer,
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Flex vertical gap="middle">
                {cart.map((item) => (
                  <Row
                    key={item._id}
                    align="middle"
                    gutter={16}
                    style={{
                      borderBottom: `1px solid ${token.colorBorderSecondary}`,
                      paddingBottom: 12,
                    }}
                  >
                    <Col span={4}>
                      <div
                        style={{
                          position: 'relative',
                          height: 60,
                          borderRadius: 8,
                          overflow: 'hidden',
                          background: token.colorFillTertiary,
                        }}
                      >
                        <Image
                          src={item.imageUrl || '/no-image.webp'}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text strong style={{ display: 'block' }}>
                        {item.name}
                      </Text>
                      <Text type="secondary">{item.price} UAH</Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                      <Flex vertical align="end" gap={4}>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(val) => updateQuantity(item._id, val || 1)}
                          size="small"
                        />
                        <Button
                          type="text"
                          danger
                          size="small"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </Col>
                  </Row>
                ))}
              </Flex>
            </Card>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                form="order-form"
                loading={isSubmitting}
                style={{ height: 50, padding: '0 60px', fontSize: 18 }}
              >
                Submit Order
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );;
}
