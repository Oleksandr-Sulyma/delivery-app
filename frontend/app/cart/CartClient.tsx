// "use client";

// import {
//   Row,
//   Col,
//   Form,
//   Input,
//   Card,
//   Button,
//   Typography,
//   Flex,
//   InputNumber,
//   Empty,
//   Tag,
//   Modal,
// } from "antd";
// import { useCartStore } from "@/store/useCartStore";
// import { orderService } from "@/services/api";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

// export default function CartClient() {
//   const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
//     useCartStore();
//   const [form] = Form.useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleOrderSubmit = async (values: any) => {
//     const hasUnavailableItems = cart.some((item) => item.isAvailable === false);
//     if (hasUnavailableItems) {
//       toast.error(
//         "Please remove unavailable items from your cart before submitting.",
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const cleanPhone = `+380${values.phone.replace(/-/g, "")}`;
//       const orderData = {
//         user: {
//           name: values.name,
//           email: values.email,
//           phone: cleanPhone,
//           address: values.address,
//         },
//         items: cart.map((item) => ({
//           product: item._id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//           imageUrl: item.imageUrl,
//         })),
//         totalPrice: getTotalPrice(),
//       };

//       const response = await orderService.createOrder(orderData);
//       const orderId = response._id 

//       Modal.success({
//         title: "Order Placed Successfully!",
//         centered: true,
//         content: (
//           <div style={{ marginTop: "15px" }}>
//             <p>
//               Thank you for your order, <strong>{values.name}</strong>!
//             </p>

//             <div
//               style={{
//                 background: "#f5f5f5",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 border: "1px dashed #d9d9d9",
//                 marginBottom: "15px",
//               }}
//             >
//               <p style={{ marginBottom: "5px", fontSize: "13px" }}>
//                 Your Order ID:
//               </p>
//               <Text
//                 copyable
//                 strong
//                 style={{ color: "#1890ff", fontSize: "16px" }}
//               >
//                 {orderId}
//               </Text>
//             </div>

//             <p>🥗 Your meal is being prepared.</p>
//             <p>
//               🚀 It will be delivered to <strong>{values.address}</strong>{" "}
//               within an hour!
//             </p>
//           </div>
//         ),
//         okText: "Back to Shop",
//         onOk: () => {
//           clearCart();
//           form.resetFields();
//           router.push("/");
//         },
//       });
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to place order");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center" }}>
//         <Empty description="Your shopping cart is empty" />
//         <Link href="/">
//           <Button type="primary" style={{ marginTop: "20px" }}>
//             Back to Shop
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <main
//       style={{
//         padding: "10px",
//         maxWidth: "1200px",
//         margin: "0 auto",
//         paddingBottom: "130px",
//       }}
//     >
//       <Row gutter={[24, 16]}>
//         <Col xs={{ span: 24, order: 1 }} md={{ span: 14, order: 2 }}>
//           <Card
//             title={
//               <Flex
//                 justify="space-between"
//                 align="center"
//                 style={{ width: "100%" }}
//               >
//                 <span>Review Your Order</span>
//                 <div style={{ textAlign: "right" }}>
//                   <Text
//                     type="secondary"
//                     style={{ fontSize: "12px", fontWeight: "normal" }}
//                   >
//                     Total:{" "}
//                   </Text>
//                   <Text strong style={{ color: "#1890ff", fontSize: "18px" }}>
//                     {getTotalPrice()} UAH
//                   </Text>
//                 </div>
//               </Flex>
//             }
//             size="small"
//             style={{
//               borderRadius: "12px",
//               maxHeight: "70vh",
//               overflowY: "auto",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//             }}
//           >
//             <Flex vertical gap="small" style={{ width: "100%" }}>
//               {cart.map((item) => {
//                 const isAvailable = item.isAvailable !== false;
//                 return (
//                   <Row
//                     key={item._id}
//                     align="middle"
//                     gutter={12}
//                     style={{
//                       borderBottom: "1px solid #f0f0f0",
//                       paddingBottom: "8px",
//                       marginBottom: "4px",
//                       opacity: isAvailable ? 1 : 0.6,
//                     }}
//                   >
//                     <Col xs={6} sm={4}>
//                       <div
//                         style={{
//                           position: "relative",
//                           height: "55px",
//                           borderRadius: "6px",
//                           overflow: "hidden",
//                         }}
//                       >
//                         <Image
//                           src={item.imageUrl || "/no-image.webp"}
//                           alt={item.name}
//                           fill
//                           sizes="100px"
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                     </Col>

//                     <Col xs={10} sm={12}>
//                       <Text
//                         strong
//                         style={{
//                           fontSize: "14px",
//                           display: "block",
//                           lineHeight: "1.2",
//                         }}
//                       >
//                         {item.name}
//                       </Text>
//                       {item.category && (
//                         <Tag
//                           color="blue"
//                           style={{
//                             fontSize: "10px",
//                             lineHeight: "14px",
//                             margin: "2px 0",
//                           }}
//                         >
//                           {item.category}
//                         </Tag>
//                       )}
//                       <Text
//                         type="secondary"
//                         style={{ fontSize: "12px", display: "block" }}
//                       >
//                         {item.price} UAH
//                       </Text>
//                     </Col>

//                     <Col xs={8} sm={8} style={{ textAlign: "right" }}>
//                       <Flex vertical align="end" gap={4}>
//                         <InputNumber
//                           min={0}
//                           value={isAvailable ? item.quantity : 0}
//                           disabled={!isAvailable}
//                           onChange={(val) => updateQuantity(item._id, val || 0)}
//                           style={{ width: "50px" }}
//                           size="small"
//                           autoComplete="off"
//                         />
//                         <Button
//                           type="text"
//                           danger
//                           size="small"
//                           onClick={() => removeFromCart(item._id)}
//                           style={{
//                             fontSize: "11px",
//                             padding: 0,
//                             height: "auto",
//                           }}
//                         >
//                           Remove
//                         </Button>
//                       </Flex>
//                     </Col>
//                   </Row>
//                 );
//               })}
//             </Flex>
//           </Card>
//         </Col>

//         <Col xs={{ span: 24, order: 2 }} md={{ span: 10, order: 1 }}>
//           <Form
//             id="order-form" 
//             form={form}
//             layout="vertical"
//             onFinish={handleOrderSubmit}
//             requiredMark={false}
//           >
//             <Card
//               title="Delivery Info"
//               size="small"
//               style={{
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[{ required: true }]}
//                 className="compact-form-item"
//               >
//                 <Input placeholder="Enter your name" size="middle" />
//               </Form.Item>

//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{ required: true, type: "email" }]}
//                 className="compact-form-item"
//               >
//                 <Input placeholder="example@mail.com" size="middle" />
//               </Form.Item>

//               <Form.Item
//                 label="Phone"
//                 name="phone"
//                 rules={[
//                   {
//                     required: true,
//                     pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
//                     message: "Format: 99-555-55-55",
//                   },
//                 ]}
//                 className="compact-form-item"
//               >
//                 <Input
//                   prefix="+380"
//                   placeholder="99-555-55-55"
//                   size="middle"
//                   autoComplete="tel-national"
//                   onChange={(e) => {
//                     let val = e.target.value.replace(/\D/g, "");
//                     if (val.startsWith("380") && val.length > 9)
//                       val = val.slice(3);
//                     else if (val.startsWith("0") && val.length > 9)
//                       val = val.slice(1);
//                     const cleanVal = val.slice(0, 9);
//                     let formatted = cleanVal;
//                     if (cleanVal.length > 2)
//                       formatted = `${cleanVal.slice(0, 2)}-${cleanVal.slice(2)}`;
//                     if (cleanVal.length > 5)
//                       formatted = `${formatted.slice(0, 6)}-${cleanVal.slice(5, 7)}-${cleanVal.slice(7, 9)}`;
//                     form.setFieldsValue({ phone: formatted });
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Address"
//                 name="address"
//                 rules={[{ required: true }]}
//                 style={{ marginBottom: 0 }}
//               >
//                 <Input.TextArea
//                   placeholder="Enter your full address"
//                   rows={2}
//                   style={{ resize: "none" }}
//                 />
//               </Form.Item>
//             </Card>
//           </Form>
//         </Col>

//         <Col span={24} style={{ order: 3 }}>
//           <div className="submit-wrapper">
//             <div className="submit-container-inner">
//               <Flex justify="flex-end">
//                 <Button
//                   type="primary"
//                   size="large"
//                   htmlType="submit"
//                   form="order-form" 
//                   loading={isSubmitting}
//                   className="submit-btn"
//                   style={{
//                     height: "50px",
//                     fontSize: "18px",
//                     borderRadius: "10px",
//                     width: "300px",
//                     boxShadow: "0 4px 15px rgba(24, 144, 255, 0.3)",
//                   }}
//                 >
//                   Submit Order
//                 </Button>
//               </Flex>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       <style jsx global>{`
//         .compact-form-item {
//           margin-bottom: 12px !important;
//         }
//         .ant-form-item-label {
//           padding-bottom: 4px !important;
//         }

//         @media (min-width: 577px) {
//           .submit-wrapper {
//             position: fixed;
//             bottom: 60px;
//             left: 0;
//             right: 0;
//             z-index: 1000;
//             pointer-events: none;
//           }
//           .submit-container-inner {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 20px;
//             width: 100%;
//           }
//           .submit-btn {
//             pointer-events: auto;
//           }
//         }

//         @media (max-width: 576px) {
//           .submit-wrapper {
//             margin-top: 20px;
//             width: 100%;
//             padding: 0 10px;
//           }
//           .submit-btn {
//             width: 100% !important;
//             max-width: 100% !important;
//             position: static !important;
//           }

//           main {
//             padding-bottom: 40px !important;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }



"use client";

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
  Tag,
  Modal,
} from "antd";
import { useCartStore } from "@/store/useCartStore";
import { orderService, couponService } from "@/services/api"; // Додали couponService
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftOutlined, DeleteOutlined } from "@ant-design/icons"; // Додали іконки

const { Title, Text } = Typography;

export default function CartClient() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    clearCart,
    appliedCoupon, // Зі стору
    applyCoupon    // Зі стору
  } = useCartStore();
  
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponInput, setCouponInput] = useState(""); // Локальний стейт для інпуту
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  // Обчислення ціни без знижки для порівняння
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    
    setIsVerifying(true);
    try {
      const data = await couponService.validate(couponInput);
      applyCoupon({ code: couponInput, discount: data.discount });
      toast.success(`Coupon applied! -${data.discount}%`);
      setCouponInput("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
      applyCoupon(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOrderSubmit = async (values: any) => {
    const hasUnavailableItems = cart.some((item) => item.isAvailable === false);
    if (hasUnavailableItems) {
      toast.error(
        "Please remove unavailable items from your cart before submitting.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhone = `+380${values.phone.replace(/-/g, "")}`;
      const orderData = {
        user: {
          name: values.name,
          email: values.email,
          phone: cleanPhone,
          address: values.address,
        },
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalPrice: getTotalPrice(),
        couponCode: appliedCoupon?.code || null, // Передаємо код, якщо він є
      };

      const response = await orderService.createOrder(orderData);
      const orderId = response._id 

      Modal.success({
        title: "Order Placed Successfully!",
        centered: true,
        content: (
          <div style={{ marginTop: "15px" }}>
            <p>
              Thank you for your order, <strong>{values.name}</strong>!
            </p>

            <div
              style={{
                background: "#f5f5f5",
                padding: "12px",
                borderRadius: "8px",
                border: "1px dashed #d9d9d9",
                marginBottom: "15px",
              }}
            >
              <p style={{ marginBottom: "5px", fontSize: "13px" }}>
                Your Order ID:
              </p>
              <Text
                copyable
                strong
                style={{ color: "#1890ff", fontSize: "16px" }}
              >
                {orderId}
              </Text>
            </div>

            <p>🥗 Your meal is being prepared.</p>
            <p>
              🚀 It will be delivered to <strong>{values.address}</strong>{" "}
              within an hour!
            </p>
          </div>
        ),
        okText: "Back to Shop",
        onOk: () => {
          clearCart();
          form.resetFields();
          router.push("/");
        },
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <Empty description="Your shopping cart is empty" />
        <Link href="/">
          <Button type="primary" style={{ marginTop: "20px" }}>
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main
      style={{
        padding: "10px",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: "130px",
      }}
    >
      <Row gutter={[24, 16]}>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 14, order: 2 }}>
          <Card
            title={
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "100%" }}
              >
                <span>Review Your Order</span>
                <div style={{ textAlign: "right" }}>
                  {appliedCoupon && (
                    <Text delete type="secondary" style={{ fontSize: "12px", display: "block" }}>
                      {subtotal} UAH
                    </Text>
                  )}
                  <Text strong style={{ color: "#1890ff", fontSize: "18px" }}>
                    {getTotalPrice()} UAH
                  </Text>
                </div>
              </Flex>
            }
            size="small"
            style={{
              borderRadius: "12px",
              maxHeight: "70vh",
              overflowY: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              {cart.map((item) => {
                const isAvailable = item.isAvailable !== false;
                return (
                  <Row
                    key={item._id}
                    align="middle"
                    gutter={12}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      paddingBottom: "8px",
                      marginBottom: "4px",
                      opacity: isAvailable ? 1 : 0.6,
                    }}
                  >
                    <Col xs={6} sm={4}>
                      <div
                        style={{
                          position: "relative",
                          height: "55px",
                          borderRadius: "6px",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={item.imageUrl || "/no-image.webp"}
                          alt={item.name}
                          fill
                          sizes="100px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </Col>

                    <Col xs={10} sm={12}>
                      <Text
                        strong
                        style={{
                          fontSize: "14px",
                          display: "block",
                          lineHeight: "1.2",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        type="secondary"
                        style={{ fontSize: "12px", display: "block" }}
                      >
                        {item.price} UAH
                      </Text>
                    </Col>

                    <Col xs={8} sm={8} style={{ textAlign: "right" }}>
                      <Flex vertical align="end" gap={4}>
                        <InputNumber
                          min={0}
                          value={isAvailable ? item.quantity : 0}
                          disabled={!isAvailable}
                          onChange={(val) => updateQuantity(item._id, val || 0)}
                          style={{ width: "50px" }}
                          size="small"
                          autoComplete="off"
                        />
                        <Button
                          type="text"
                          danger
                          size="small"
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            fontSize: "11px",
                            padding: 0,
                            height: "auto",
                          }}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </Col>
                  </Row>
                );
              })}
            </Flex>
          </Card>
        </Col>

        <Col xs={{ span: 24, order: 2 }} md={{ span: 10, order: 1 }}>
          <Flex vertical gap="middle">
            <Form
              id="order-form" 
              form={form}
              layout="vertical"
              onFinish={handleOrderSubmit}
              requiredMark={false}
            >
              <Card
                title="Delivery Info"
                size="small"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                  className="compact-form-item"
                >
                  <Input placeholder="Enter your name" size="middle" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                  className="compact-form-item"
                >
                  <Input placeholder="example@mail.com" size="middle" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
                      message: "Format: 99-555-55-55",
                    },
                  ]}
                  className="compact-form-item"
                >
                  <Input
                    prefix="+380"
                    placeholder="99-555-55-55"
                    size="middle"
                    autoComplete="tel-national"
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.startsWith("380") && val.length > 9)
                        val = val.slice(3);
                      else if (val.startsWith("0") && val.length > 9)
                        val = val.slice(1);
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
                    placeholder="Enter your full address"
                    rows={2}
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </Card>
            </Form>

            {/* Блок купона */}
            <Card
              size="small"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Flex vertical gap="small">
                <Flex align="center" gap="small">
                  <GiftOutlined style={{ color: "#1890ff" }} />
                  <Text strong>Apply Coupon</Text>
                </Flex>
                
                {!appliedCoupon ? (
                  <Flex gap="small">
                    <Input 
                      placeholder="Enter code" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    />
                    <Button 
                      type="primary" 
                      onClick={handleApplyCoupon} 
                      loading={isVerifying}
                      disabled={!couponInput}
                    >
                      Apply
                    </Button>
                  </Flex>
                ) : (
                  <Flex 
                    justify="space-between" 
                    align="center" 
                    style={{ 
                      background: "#f6ffed", 
                      padding: "8px 12px", 
                      borderRadius: "8px", 
                      border: "1px solid #b7eb8f" 
                    }}
                  >
                    <Text type="success">
                      Applied: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount}%)
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

        <Col span={24} style={{ order: 3 }}>
          <div className="submit-wrapper">
            <div className="submit-container-inner">
              <Flex justify="flex-end">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  form="order-form" 
                  loading={isSubmitting}
                  className="submit-btn"
                  style={{
                    height: "50px",
                    fontSize: "18px",
                    borderRadius: "10px",
                    width: "300px",
                    boxShadow: "0 4px 15px rgba(24, 144, 255, 0.3)",
                  }}
                >
                  Submit Order
                </Button>
              </Flex>
            </div>
          </div>
        </Col>
      </Row>

      <style jsx global>{`
        .compact-form-item {
          margin-bottom: 12px !important;
        }
        .ant-form-item-label {
          padding-bottom: 4px !important;
        }

        @media (min-width: 577px) {
          .submit-wrapper {
            position: fixed;
            bottom: 60px;
            left: 0;
            right: 0;
            z-index: 1000;
            pointer-events: none;
          }
          .submit-container-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
          }
          .submit-btn {
            pointer-events: auto;
          }
        }

        @media (max-width: 576px) {
          .submit-wrapper {
            margin-top: 20px;
            width: 100%;
            padding: 0 10px;
          }
          .submit-btn {
            width: 100% !important;
            max-width: 100% !important;
            position: static !important;
          }

          main {
            padding-bottom: 40px !important;
          }
        }
      `}</style>
    </main>
  );
}