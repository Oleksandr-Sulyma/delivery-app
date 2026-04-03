"use client";

import { theme, Grid } from "antd";
import ShopList from "@/components/ShopList/ShopList";
import { Shop } from "@/types";

const { useBreakpoint } = Grid;

interface ShopSectionProps {
  shops: Shop[];
  selectedShopId: string | null;
  onShopSelect: (id: string) => void;
  onRatingFilter: (min: number | null, max: number | null) => void;
}

export default function ShopSection({
  shops,
  selectedShopId,
  onShopSelect,
  onRatingFilter,
}: ShopSectionProps) {
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const isDesktop = screens.xl;

  return (
    <div
      style={{
        position: isDesktop ? "sticky" : "static",
        top: "84px",
        display: "flex",
        flexDirection: "column",
        height: isDesktop ? "calc(100vh - 124px)" : "auto",
        border: isDesktop ? `1px solid ${token.colorBorderSecondary}` : "none",
        borderRadius: "12px",
        background: token.colorBgContainer,
        transition: "all 0.3s ease",
        overflow: isDesktop ? "hidden" : "visible",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: isDesktop ? "auto" : "visible",
          padding: isDesktop ? "20px" : "0 0 20px 0",
          scrollbarWidth: "thin",
        }}
      >
        <ShopList
          shops={shops}
          selectedShopId={selectedShopId}
          onSelectShop={onShopSelect}
          onFilterChange={onRatingFilter}
        />
      </div>
    </div>
  );
}
