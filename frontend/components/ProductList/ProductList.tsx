"use client";

import { Row, Col, Select, Checkbox, Flex, Typography, theme } from "antd";
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
      
      {/* --- ШАПКА ЯК У МАГАЗИНАХ --- */}
      <div
        style={{
          position: "sticky",
          top: "64px", 
          zIndex: 100,
          background: token.colorBgContainer,
          paddingTop: "20px",    // Компенсуємо відсутній падінг батька
          paddingBottom: "15px", // Відступ до карток
          // marginBottom: "5px",
        }}
      >
        <div
          style={{
            background: isDarkMode ? token.colorFillAlter : "#fafafa",
            padding: "15px",
            borderRadius: "8px",
            border: `1px solid ${isDarkMode ? token.colorBorderSecondary : "#f0f0f0"}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={16}>
              <Flex vertical gap={4}>
                <Text strong>Filter by Category:</Text>
                <Checkbox.Group
                  options={categories}
                  value={selectedCategories}
                  onChange={(checkedValues) => onCategoryChange(checkedValues as string[])}
                />
              </Flex>
            </Col>
            <Col xs={24} md={8}>
              <Flex vertical gap={4}>
                <Text strong>Sort by:</Text>
                <Select
                  placeholder="Sort by"
                  style={{ width: "100%" }}
                  onChange={onSortChange}
                  options={[
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                    { value: "name-asc", label: "Name: A → Z" },
                    { value: "createdAt-desc", label: "Newest first" },
                  ]}
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </div>

      {/* --- СПИСОК ТОВАРІВ --- */}
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col key={product._id} xs={24} sm={12} lg={8} xl={6}>
            <ProductCard product={product} onAddToCart={onAddToCart} index={index}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}