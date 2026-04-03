"use client";

import { Typography, Select, Empty, theme, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import type { Shop } from '@/types/index';
import ShopCard from '../ShopCard/ShopCard';

const { Title } = Typography;

interface ShopListProps {
  shops: Shop[];
  selectedShopId: string | null;
  onSelectShop: (id: string) => void;
  onFilterChange?: (min: number | null, max: number | null) => void;
}

export default function ShopList({
  shops,
  selectedShopId,
  onSelectShop,
  onFilterChange,
}: ShopListProps) {
  const { token } = theme.useToken();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          position: 'sticky',
          top: '-20px',
          zIndex: 10,
          background: token.colorBgContainer,
          paddingBottom: '12px',
          paddingTop: '4px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Title level={4} style={{ margin: '0 0 12px 0', textAlign: 'center' }}>
          Select Shop
        </Title>

        <Select
          placeholder={
            <span>
              <FilterOutlined /> Filter by Rating
            </span>
          }
          style={{ width: '100%' }}
          allowClear
          onChange={(value) => {
            if (!value) {
              onFilterChange?.(null, null);
              return;
            }
            const [min, max] = value.split('-').map(Number);
            onFilterChange?.(min, max);
          }}
          options={[
            { value: '4-5', label: '⭐ 4.0 - 5.0' },
            { value: '3-4', label: '⭐ 3.0 - 4.0' },
            { value: '2-3', label: '⭐ 2.0 - 3.0' },
            { value: '1-2', label: '⭐ 1.0 - 2.0' },
          ]}
        />
      </div>

      <Row gutter={[16, 16]}>
        {Array.isArray(shops) && shops.length > 0 ? (
          shops.map((shop) => (
            <Col key={shop._id} xs={24} md={12} xl={24}>
              <ShopCard
                shop={shop}
                isActive={selectedShopId === shop._id}
                onSelect={onSelectShop}
              />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="No shops found" style={{ marginTop: '20px' }} />
          </Col>
        )}
      </Row>
    </div>
  );
}
