"use client";

import { Card, Typography, Space, Tag, Select, Empty } from "antd";
import { EnvironmentOutlined, StarFilled, FilterOutlined } from "@ant-design/icons";
import type { Shop } from "@/types/index";

const { Text, Title } = Typography;

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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Title level={4} style={{ margin: "0 0 8px 0", textAlign: "center" }}>
        Select Shop
      </Title>

      <Select
        placeholder={
          <span>
            <FilterOutlined /> Filter by Rating
          </span>
        }
        style={{ width: "100%", marginBottom: "8px" }}
        allowClear
        onChange={(value) => {
          if (!value) {
            onFilterChange?.(null, null);
            return;
          }
          const [min, max] = value.split("-").map(Number);
          onFilterChange?.(min, max);
        }}
        options={[
          { value: "4-5", label: "⭐ 4.0 - 5.0" },
          { value: "3-4", label: "⭐ 3.0 - 4.0" },
          { value: "2-3", label: "⭐ 2.0 - 3.0" },
          { value: "1-2", label: "⭐ 1.0 - 2.0" },
        ]}
      />

      {Array.isArray(shops) && shops.length > 0 ? (
        shops.map((shop) => {
          const isActive = selectedShopId === shop._id;

          return (
            <Card
              key={shop._id}
              hoverable
              onClick={() => onSelectShop(shop._id)}
              cover={
                <div
                  style={{
                    position: "relative",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt={shop.name}
                    src={shop.imageUrl || "/no-image.webp"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Tag
                    color="#faad14"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "4px",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    <StarFilled /> {shop.rating ? shop.rating.toFixed(1) : "0.0"}
                  </Tag>
                </div>
              }
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: isActive ? "2px solid #1890ff" : "1px solid #f0f0f0",
                boxShadow: isActive
                  ? "0 4px 12px rgba(24, 144, 255, 0.2)"
                  : "none",
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}
              styles={{ body: { padding: "12px" } }}
            >
              <Space vertical size={2} style={{ width: "100%" }}>
                <Text strong style={{ fontSize: "16px", display: "block" }}>
                  {shop.name}
                </Text>

                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <EnvironmentOutlined style={{ color: "#ff4d4f" }} />
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {shop.address}
                  </span>
                </Text>
              </Space>
            </Card>
          );
        })
      ) : (
        <Empty description="No shops found" style={{ marginTop: "20px" }} />
      )}
    </div>
  );
}