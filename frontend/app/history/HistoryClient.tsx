"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Form, Input, Button, Card, Row, Col, Typography, Empty, Tag, Divider, Flex, Modal, Tabs } from "antd";
import { SearchOutlined, ShoppingCartOutlined, HistoryOutlined, LoadingOutlined, ExclamationCircleOutlined, NumberOutlined } from "@ant-design/icons";
import { orderService, productsService } from "@/services/api";
import { useCartStore } from "@/store/useCartStore";
import { Product, OrderResponse } from "@/types/index";
import toast from "react-hot-toast";

const { Title, Text } = Typography;
const { confirm } = Modal;

export default function HistoryClient() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [reorderLoading, setReorderLoading] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'contacts' | 'id'>('contacts');
  const [form] = Form.useForm();
  const initialized = useRef(false);

  const { cart, clearCart, addManyItems, lastSearch, setLastSearch } = useCartStore();

  const onSearch = useCallback(async (values: any) => {
    setLoading(true);
    try {
      let data: OrderResponse[] = [];

      if (searchMode === 'contacts') {
        const cleanPhone = `+380${values.phone.replace(/\D/g, "")}`;
        data = await orderService.getOrderHistory(values.email, cleanPhone);
        setLastSearch(values.email, values.phone);
      } else {
      const res = await orderService.getOrderById(values.orderId);
      data = res ? [res] : [];
    }

      setOrders(data);
      if (data.length === 0) toast.error("No orders found");
    } catch (error: any) {
      toast.error(error.response?.status === 404 ? "Order not found" : "Search failed");
    setOrders([]);
  } finally {
    setLoading(false);
  }
}, [searchMode, setLastSearch]);

  useEffect(() => {
    if (lastSearch?.email && lastSearch?.phone && !initialized.current) {
      form.setFieldsValue(lastSearch);
      onSearch(lastSearch);
      initialized.current = true;
    }
  }, [lastSearch, onSearch, form]);

  const processReorder = async (historyItems: any[]) => {
    try {
      const ids = historyItems.map((item) => item.product);
      const response = await productsService.getAllProducts({ ids, perPage: 100 });
      const freshProducts = response.data;
      const itemsToAdd = freshProducts
        .filter((p: Product) => p.isAvailable)
        .map((product: Product) => {
          const hItem = historyItems.find((h) => h.product === product._id);
          return { ...product, quantity: hItem ? hItem.quantity : 1 };
        });
      if (itemsToAdd.length === 0) {
        toast.error("Sorry, items are no longer available");
        return;
      }
      addManyItems(itemsToAdd);
      toast.success("Items added to cart!");
    } catch (error) {
      toast.error("Failed to sync products");
    }
  };

  const handleReorder = async (orderId: string, historyItems: any[]) => {
    setReorderLoading(orderId);
    try {
      const ids = historyItems.map((item) => item.product);
      const response = await productsService.getAllProducts({ ids, perPage: 1 });
      const newShopId = response.data[0]?.shop;
      if (cart.length > 0 && cart[0].shop !== newShopId) {
        confirm({
          title: "Replace cart items?",
          icon: <ExclamationCircleOutlined />,
          content: "Clear cart to add items from this order?",
          okText: "Yes, replace",
          onOk: async () => {
            clearCart();
            await processReorder(historyItems);
            setReorderLoading(null);
          },
          onCancel: () => setReorderLoading(null),
        });
      } else {
        await processReorder(historyItems);
        setReorderLoading(null);
      }
    } catch (error) {
      toast.error("Failed to check items");
      setReorderLoading(null);
    }
  };

  return (
    <main style={{ padding: "0px 40px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <Flex vertical gap="large" style={{ width: "100%" }}>
        <Title level={2}><HistoryOutlined /> Order History</Title>

        <Card style={{ borderRadius: "12px", background: "#fafafa" }}>
          <Tabs
            activeKey={searchMode}
            onChange={(key: any) => setSearchMode(key)}
            items={[
              { key: 'contacts', label: 'Email & Phone' },
              { key: 'id', label: 'Order ID' },
            ]}
          />

          <Form form={form} layout="vertical" onFinish={onSearch} style={{ marginTop: '10px' }}>
            <Row gutter={[16, 0]} align="bottom">
              {searchMode === 'contacts' ? (
                <>
                  <Col xs={24} md={9}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                      <Input placeholder="email@example.com" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={9}>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                      <Input
                        prefix="+380"
                        placeholder="99-555-55-55"
                        size="large"
                        autoComplete="tel-national"
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.startsWith("380") && val.length > 9) val = val.slice(3);
                          else if (val.startsWith("0") && val.length > 9) val = val.slice(1);
                          const cleanVal = val.slice(0, 9);
                          let formatted = cleanVal;
                          if (cleanVal.length > 2) formatted = `${cleanVal.slice(0, 2)}-${cleanVal.slice(2)}`;
                          if (cleanVal.length > 5) formatted = `${formatted.slice(0, 6)}-${cleanVal.slice(5, 7)}-${cleanVal.slice(7, 9)}`;
                          form.setFieldsValue({ phone: formatted });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <Col xs={24} md={18}>
                  <Form.Item label="Order ID" name="orderId" rules={[{ required: true, message: 'Enter Order ID' }]}>
                    <Input prefix={<NumberOutlined />} placeholder="Enter your full order ID" size="large" />
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} md={6}>

                <Form.Item style={{ marginBottom: '24px' }}>
                  <Button type="primary" htmlType="submit" size="large" block loading={loading} icon={<SearchOutlined />}>
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {orders.length > 0 ? (
          <Flex vertical gap="middle">
            {orders.map((order: any) => (
              <Card
                key={order._id}
                title={
                  <Flex justify="space-between">
                    <Text strong>Order #{order._id.slice(-6)}</Text>
                    <Text type="secondary">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                  </Flex>
                }
                extra={<Tag color="blue">{order.status}</Tag>}
                style={{ borderRadius: "12px" }}
              >
                <Row gutter={24} align="middle">
                  <Col xs={24} sm={16}>
                    {order.items.map((item: any, i: number) => (
                      <Flex
                        key={i}
                        justify="space-between"
                        style={{ marginBottom: "4px" }}
                      >
                        <Text>
                          {item.name} x{item.quantity}
                        </Text>
                        <Text>{item.price * item.quantity} UAH</Text>
                      </Flex>
                    ))}
                    <Divider style={{ margin: "12px 0" }} />
                    <Title level={4} style={{ margin: 0 }}>
                      Total: {order.totalPrice} UAH
                    </Title>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Button
                      type="primary"
                      block
                      size="large"
                      icon={
                        reorderLoading === order._id ? (
                          <LoadingOutlined />
                        ) : (
                          <ShoppingCartOutlined />
                        )
                      }
                      onClick={() => handleReorder(order._id, order.items)}
                      loading={reorderLoading === order._id}
                    >
                      Reorder
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Flex>
        ) : (
          !loading && (
            <Empty description="No orders found. Try changing search criteria." />
          )
        )}
      </Flex>
    </main>
  );
}
