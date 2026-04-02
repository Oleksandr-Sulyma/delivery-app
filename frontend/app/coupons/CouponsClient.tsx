"use client";

import { Row, Col, Card, Button, Typography, Empty, Flex, message, Badge } from "antd";
import { CopyOutlined, GiftOutlined } from "@ant-design/icons";
import { Coupon } from "@/types";
import Image from "next/image";

const { Title, Text } = Typography;

interface Props {
  initialCoupons: Coupon[];
}

export default function CouponsClient({ initialCoupons }: Props) {
  const handleCopy = (code: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      message.success(`Code ${code} copied to clipboard!`);
    }
  };

  return (
    <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", minHeight: '80vh' }}>
      <Flex align="center" gap="middle" style={{ marginBottom: "40px" }}>
        <GiftOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
        <Title level={2} style={{ margin: 0 }}>Available Coupons</Title>
      </Flex>

      {initialCoupons.length === 0 ? (
        <Empty description="No active coupons at the moment" />
      ) : (
        <Row gutter={[24, 24]}>
          {initialCoupons.map((coupon, index) => (
            <Col xs={24} sm={12} lg={8} key={coupon._id}>
              <Badge.Ribbon text={`-${coupon.discount}%`} color="volcano">
                <Card
                  hoverable
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                  cover={
                    <div style={{ position: "relative", height: "200px" }}>
                      <Image
                        src={coupon.imageUrl || "/no-image.webp"}
                        alt={coupon.name}
                        fill
                        unoptimized 
                        priority={index === 0} 
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  }
                  actions={[
                    <Button 
                      type="primary" 
                      icon={<CopyOutlined />} 
                      onClick={() => handleCopy(coupon.code)}
                      key="copy"
                      style={{ width: "85%" }}
                    >
                      Copy Code
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={coupon.name}
                    description={
                      <Flex vertical gap="small">
                        <Text type="secondary">Promo Code:</Text>
                        <div style={{ 
                          background: "#fff7e6", 
                          padding: "8px", 
                          borderRadius: "6px", 
                          border: "1px dashed #ffa940",
                          textAlign: "center"
                        }}>
                          <Text strong style={{ fontSize: "18px", color: "#d46b08" }}>
                            {coupon.code}
                          </Text>
                        </div>
                      </Flex>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}