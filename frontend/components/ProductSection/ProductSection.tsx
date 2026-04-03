"use client";

import { useEffect } from "react";
import { Flex, Spin, Empty, theme } from "antd";
import { useInView } from "react-intersection-observer";
import ProductList from "@/components/ProductList/ProductList";
import { ProductSectionProps } from "@/types";

export default function ProductSection({
  isLoading,
  products = [],
  hasMore,
  selectedShopId,
  selectedCategories,
  isDarkMode,
  isMobile,
  onAddToCart,
  onCategoryChange,
  onSortChange,
  onLoadMore,
}: ProductSectionProps) {
  const { token } = theme.useToken();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Дозволяє розтягуватися під висоту Row (align="stretch")
        minHeight: "700px",
        border: isMobile ? "none" : `1px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`,
        borderRadius: "12px",
        background: token.colorBgContainer,
        transition: "all 0.3s ease",
        overflow: "visible", // ВАЖЛИВО: вимикаємо внутрішній скрол блоку
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "0 20px 20px 20px",
          position: "relative",
        }}
      >
        <ProductList
          products={products}
          onAddToCart={onAddToCart}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          onSortChange={onSortChange}
        />

        <div ref={ref} style={{ textAlign: "center", padding: "20px" }}>
          {isLoading && <Spin size="large" />}
          {!hasMore && products?.length > 0 && (
            <div style={{ color: token.colorTextTertiary }}>
              You have seen all products
            </div>
          )}
        </div>

        {(!products || products.length === 0) && !isLoading && (
          <Flex vertical align="center" justify="center" style={{ padding: "40px 0" }}>
            <Empty description={selectedShopId ? "No products found" : "Select a shop"} />
          </Flex>
        )}
      </div>
    </div>
  );
}