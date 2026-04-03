"use client";

import { theme } from "antd";
import ShopList from "@/components/ShopList/ShopList";
import { Shop } from "@/types";

interface ShopSectionProps {
  shops: Shop[];
  selectedShopId: string | null;
  isDarkMode: boolean;
  isMobile: boolean;
  onShopSelect: (id: string) => void;
  onRatingFilter: (min: number | null, max: number | null) => void;
}

export default function ShopSection({
  shops,
  selectedShopId,
  isDarkMode,
  isMobile,
  onShopSelect,
  onRatingFilter,
}: ShopSectionProps) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        position: isMobile ? "static" : "sticky", // Липне до екрана
        top: "84px", // 64px хедер + 20px відступ
        display: "flex",
        flexDirection: "column",
        // Обмежуємо висоту блоку магазинів, щоб він мав свій скрол
        height: isMobile ? "auto" : "calc(100vh - 124px)", 
        border: isMobile ? "none" : `1px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`,
        borderRadius: "12px",
        background: token.colorBgContainer,
        transition: "all 0.3s ease",
        overflow: "hidden", // Батько не скролиться
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto", // СКРОЛ ТІЛЬКИ ТУТ
          padding: "20px",
          // Стилізація скролбару (опційно)
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