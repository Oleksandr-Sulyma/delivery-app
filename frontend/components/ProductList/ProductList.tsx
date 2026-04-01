"use client";

import { Row, Col, Select, Checkbox, Space, Typography, Divider } from "antd";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "@/types/index";
import { useState, useMemo } from "react";

const { Text } = Typography;

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  const [sortBy, setSortBy] = useState<string>("default");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Burgers', 'Pizzas', 'Drinks', 'Sushi', 'Desserts'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [products, sortBy, selectedCategories]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ 
        background: "#fafafa", 
        padding: "15px", 
        borderRadius: "8px", 
        border: "1px solid #f0f0f0" 
      }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Space vertical size={4} style={{ width: '100%' }}>
              <Text strong>Filter by Category:</Text>
              <Checkbox.Group 
                options={categories} 
                value={selectedCategories}
                onChange={(checkedValues) => setSelectedCategories(checkedValues as string[])} 
              />
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Space vertical size={4} style={{ width: '100%' }}>
              <Text strong>Sort by:</Text>
              <Select
                defaultValue="default"
                style={{ width: "100%" }}
                onChange={setSortBy}
                options={[
                  { value: "default", label: "Default" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "name-asc", label: "Name: A → Z" },
                  { value: "name-desc", label: "Name: Z → A" },
                ]}
              />
            </Space>
          </Col>
        </Row>
      </div>

      <Divider style={{ margin: "10px 0" }} />

      <Row gutter={[16, 16]}>
        {filteredAndSortedProducts.map((product) => (
          <Col key={product._id} xs={24} sm={12} lg={8} xl={6}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>

      {filteredAndSortedProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#bfbfbf' }}>
          No products found matching these filters.
        </div>
      )}
    </div>
  );
}