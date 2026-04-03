"use client";

import { useEffect, useState } from "react";
import { Flex, Spin, Empty, theme, Button, Grid } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";
import ProductList from "@/components/ProductList/ProductList";
import { Product } from "@/types";

const { useBreakpoint } = Grid;

interface ProductSectionProps {
  isLoading: boolean;
  products: Product[];
  hasMore: boolean;
  selectedShopId: string | null;
  selectedCategories: string[];
  onAddToCart: (product: Product) => void;
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (value: string) => void;
  onLoadMore: () => void;
}

export default function ProductSection({
  isLoading,
  products = [],
  hasMore,
  selectedShopId,
  selectedCategories,
  onAddToCart,
  onCategoryChange,
  onSortChange,
  onLoadMore,
}: ProductSectionProps) {
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const isDesktop = screens.xl;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "700px",
        border: isDesktop ? `1px solid ${token.colorBorderSecondary}` : "none",
        borderRadius: "12px",
        background: token.colorBgContainer,
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {!isDesktop && (
        <div
          style={{
            padding: "10px 20px",
            position: "sticky",
            top: "64px",
            zIndex: 110,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Button
            icon={<ArrowUpOutlined />}
            onClick={scrollToTop}
            block
            type="primary"
            ghost
            style={{
              height: "40px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Back to Shops
          </Button>
        </div>
      )}

      <div
        style={{
          flex: 1,
          padding: !isDesktop ? "0 10px 20px 10px" : "0 20px 20px 20px",
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
