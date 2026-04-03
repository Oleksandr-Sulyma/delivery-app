'use client';

import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Empty,
  Flex,
  Badge,
  theme,
  App,
} from 'antd';
import { CopyOutlined, GiftOutlined } from '@ant-design/icons';
import { Coupon } from '@/types';
import Image from 'next/image';

const { Title, Text } = Typography;

interface Props {
  initialCoupons: Coupon[];
}

export default function CouponsClient({ initialCoupons }: Props) {
  const { token } = theme.useToken();
  const { message } = App.useApp();

  const handleCopy = (code: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      message.success(`Code ${code} copied to clipboard!`);
    }
  };

  return (
    <main style={{ padding: '40px 0', minHeight: '100vh' }}>
      <div className="container">
        <Flex align="center" gap="middle" style={{ marginBottom: '40px' }}>
          <GiftOutlined
            style={{ fontSize: '32px', color: token.colorPrimary }}
          />
          <Title level={2} style={{ margin: 0 }}>
            Available Coupons
          </Title>
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
                    className="app-card-interactive"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      background: token.colorBgContainer,
                    }}
                    cover={
                      <div
                        style={{
                          position: 'relative',
                          height: '200px',
                          background: token.colorFillTertiary,
                          borderTopLeftRadius: '12px',
                          borderTopRightRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={coupon.imageUrl || '/no-image.webp'}
                          alt={coupon.name}
                          fill
                          unoptimized
                          priority={index < 3}
                          style={{
                            objectFit: 'cover',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                          }}
                        />
                      </div>
                    }
                    actions={[
                      <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={() => handleCopy(coupon.code)}
                        key="copy"
                        style={{ width: '85%' }}
                      >
                        Copy Code
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Text strong style={{ fontSize: '18px' }}>
                          {coupon.name}
                        </Text>
                      }
                      description={
                        <Flex vertical gap="small" style={{ marginTop: '8px' }}>
                          <Text type="secondary">Promo Code:</Text>
                          <div
                            style={{
                              background: token.colorWarningBg,
                              padding: '12px',
                              borderRadius: '8px',
                              border: `1px dashed ${token.colorWarningBorder}`,
                              textAlign: 'center',
                            }}
                          >
                            <Text
                              strong
                              style={{
                                fontSize: '20px',
                                color: token.colorWarningText,
                                letterSpacing: '1px',
                              }}
                            >
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
      </div>
    </main>
  );
}
