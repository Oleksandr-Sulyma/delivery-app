"use client";

import { Row, Col, Select, Checkbox, Flex, Typography, Divider, theme } from "antd";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "@/types/index";
import { useCartStore } from "@/store/useCartStore";

const { Text } = Typography;

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (value: string) => void;
}

export default function ProductList({
  products,
  onAddToCart,
  selectedCategories,
  onCategoryChange,
  onSortChange,
}: ProductListProps) {
  const isDarkMode = useCartStore((state) => state.isDarkMode);
  const { token } = theme.useToken();

  const categories = ["Burgers", "Pizzas", "Drinks", "Sushi", "Desserts"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: isDarkMode ? token.colorFillAlter : "#fafafa",
          padding: "15px",
          borderRadius: "8px",
          border: `1px solid ${isDarkMode ? token.colorBorderSecondary : "#f0f0f0"}`,
          transition: "all 0.3s ease",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Flex vertical gap={4} style={{ width: "100%" }}>
              <Text strong style={{ color: token.colorText }}>
                Filter by Category:
              </Text>
              <Checkbox.Group
                options={categories}
                value={selectedCategories}
                onChange={(checkedValues) => onCategoryChange(checkedValues as string[])}
                style={{ color: token.colorText }}
              />
            </Flex>
          </Col>
          <Col xs={24} md={8}>
            <Flex vertical gap={4} style={{ width: "100%" }}>
              <Text strong style={{ color: token.colorText }}>
                Sort by:
              </Text>
              <Select
                placeholder="Sort by"
                style={{ width: "100%" }}
                onChange={onSortChange}
                options={[
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "name-asc", label: "Name: A → Z" },
                  { value: "name-desc", label: "Name: Z → A" },
                ]}
              />
            </Flex>
          </Col>
        </Row>
      </div>

      <Divider
        style={{
          margin: "10px 0",
          borderColor: isDarkMode ? token.colorBorderSecondary : undefined,
        }}
      />

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product._id} xs={24} sm={12} lg={8} xl={6}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>

      {products.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: isDarkMode ? token.colorTextDisabled : "#bfbfbf",
          }}
        >
          No products found matching these filters.
        </div>
      )}
    </div>
  );
}
