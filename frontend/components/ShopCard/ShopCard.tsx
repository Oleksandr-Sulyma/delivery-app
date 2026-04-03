"use client";

import { Card, Typography, Flex, Tag, theme } from 'antd';
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import type { Shop } from '@/types/index';

const { Text } = Typography;

interface ShopCardProps {
  shop: Shop;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function ShopCard({ shop, isActive, onSelect }: ShopCardProps) {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      className={`shop-card-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(shop._id)}
      cover={
        <div style={{ position: 'relative', height: '100px', overflow: 'hidden' }}>
          <img
            alt={shop.name}
            src={shop.imageUrl || '/no-image.webp'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isActive ? 'none' : 'grayscale(0.2)',
              transition: 'filter 0.3s ease'
            }}
          />
          <Tag
            color="#faad14"
            style={{
              position: 'absolute',
              top: '8px',
              right: '4px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            <StarFilled /> {shop.rating ? shop.rating.toFixed(1) : '0.0'}
          </Tag>
        </div>
      }
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        border: isActive ? `2px solid ${token.colorPrimary}` : `1px solid ${token.colorBorderSecondary}`,
        background: isActive ? token.colorBgContainer : token.colorFillAlter,
        boxShadow: isActive ? `0 0 0 2px ${token.colorPrimary}22, 0 4px 12px ${token.colorPrimary}33` : 'none',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        cursor: 'pointer',
        height: '100%'
      }}
      styles={{ body: { padding: '12px' } }}
    >
      <Flex vertical gap={2} style={{ width: '100%' }}>
        <Text
          strong
          style={{
            fontSize: '16px',
            display: 'block',
            color: isActive ? token.colorPrimary : token.colorText
          }}
        >
          {shop.name}
        </Text>

        <Text
          type="secondary"
          style={{
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: isActive ? token.colorText : token.colorTextSecondary,
          }}
        >
          <EnvironmentOutlined style={{ color: token.colorError }} />
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {shop.address}
          </span>
        </Text>
      </Flex>
    </Card>
  );
}
