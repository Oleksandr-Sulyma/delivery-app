"use client";

import { Button, Space } from "antd";
import type { IShop } from "@/types/types";

interface ShopListProps {
  shops: IShop[];
  selectedShopId: string | null;
  onSelectShop: (id: string) => void;
}

export default function ShopList({
  shops,
  selectedShopId,
  onSelectShop,
}: ShopListProps) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #d9d9d9",
        borderRadius: "12px",
        height: "calc(100vh - 140px)",
        overflowY: "auto",
        background: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Shops:</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {shops.map((shop) => (
          <Button
            key={shop._id}
            block
            size="large"
            type={selectedShopId === shop._id ? "primary" : "default"}
            onClick={() => onSelectShop(shop._id)}
          >
            {shop.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
