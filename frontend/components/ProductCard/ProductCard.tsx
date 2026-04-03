"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, Button, Typography, Flex, Tag, theme } from "antd";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/types/index";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToCart, index = 0 }: ProductCardProps) {
  const { token } = theme.useToken();
  const [imgSrc, setImgSrc] = useState(product.imageUrl || "/no-image.webp");

  const isInCart = useCartStore((state) =>
    state.cart.some((item) => item._id === product._id)
  );

  const isAvailable = product.isAvailable !== false;

  return (
    <Card
      hoverable={isAvailable}
      className="app-card-interactive"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        opacity: isAvailable ? 1 : 0.6,
        filter: isAvailable ? "none" : "grayscale(0.5)",
      }}
      styles={{ body: { padding: "16px", flex: 1, display: "flex", flexDirection: "column" } }}
      cover={
        <div style={{ position: "relative", height: "160px", width: "100%", background: token.colorFillTertiary }}>
          <Image
            alt={product.name}
            src={imgSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            priority={index < 4}
            onError={() => setImgSrc("/no-image.webp")}
          />
          <Tag
            color="cyan"
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              margin: 0,
              zIndex: 2,
              fontWeight: "500"
            }}
          >
            {product.category}
          </Tag>

          {!isAvailable && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: 'white', fontWeight: 'bold', fontSize: '14px', zIndex: 1,
              textTransform: 'uppercase'
            }}>
              Out of Stock
            </div>
          )}
        </div>
      }
    >
      <Flex vertical gap="small" style={{ flex: 1 }}>
        <Title level={5} style={{ margin: "0 0 8px 0", height: '44px', overflow: 'hidden' }}>
          {product.name}
        </Title>

        <Flex vertical gap="middle" style={{ marginTop: "auto" }}>
          <div style={{ textAlign: 'left' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '2px' }}>
              Price:
            </Text>
            <Text strong style={{
              fontSize: "18px",
              color: token.colorPrimary,
              display: 'block'
            }}>
              {product.price} UAH
            </Text>
          </div>

          <Button
            type={isInCart ? "default" : "primary"}
            danger={isInCart && isAvailable}
            disabled={!isAvailable}
            block
            onClick={(e) => {
              e.stopPropagation();
              if (isAvailable) onAddToCart(product);
            }}
          >
            {!isAvailable ? "Sold Out" : (isInCart ? "Remove" : "Add to Cart")}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
