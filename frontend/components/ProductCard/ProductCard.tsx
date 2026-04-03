"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, Button, Typography, Flex, Tag } from "antd";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/types/index";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product; // Використовуємо твій чіткий інтерфейс
  onAddToCart: (p: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToCart, index = 0 }: ProductCardProps) {
  // Використовуємо imageUrl з інтерфейсу, або фолбек
  const [imgSrc, setImgSrc] = useState(product.imageUrl || "/no-image.webp");
  
  const isInCart = useCartStore((state) => 
    state.cart.some((item) => item._id === product._id)
  );
  
  // Використовуємо isAvailable прямо з твого інтерфейсу
  const isAvailable = product.isAvailable !== false;

  return (
    <Card
      hoverable={isAvailable}
      style={{ 
        width: "100%", 
        borderRadius: "12px", 
        overflow: "hidden",
        opacity: isAvailable ? 1 : 0.6,
        filter: isAvailable ? "none" : "grayscale(0.5)",
        display: "flex",
        flexDirection: "column",
        height: "100%" // Щоб всі картки були однієї висоти в Row
      }}
      cover={
        <div style={{ position: "relative", height: "160px", width: "100%", background: "#f0f0f0" }}>
          <Image
            alt={product.name}
            src={imgSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={index < 4}
            onError={() => setImgSrc("/no-image.webp")}
          />
          <Tag color="blue" style={{ position: 'absolute', top: 8, left: 8, margin: 0, zIndex: 2 }}>
            {product.category}
          </Tag>

          {!isAvailable && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: 'white', fontWeight: 'bold', fontSize: '16px', zIndex: 1
            }}>
              OUT OF STOCK
            </div>
          )}
        </div>
      }
    >
      <Flex vertical gap="small" style={{ flex: 1 }}>
        <Title level={5} style={{ margin: "0 0 8px 0", height: '44px', overflow: 'hidden' }}>
          {product.name}
        </Title>
        
        <Flex justify="space-between" align="center" style={{ marginTop: "auto" }}>
          <Text strong style={{ fontSize: "17px" }}>{product.price} UAH</Text>
          
          <Button
            type={isInCart ? "default" : "primary"}
            danger={isInCart && isAvailable}
            disabled={!isAvailable} 
            onClick={() => isAvailable && onAddToCart(product)}
          >
            {!isAvailable ? "Not Available" : (isInCart ? "Remove" : "Add to Cart")}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}