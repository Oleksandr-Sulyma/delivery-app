import Image from 'next/image';
import { useState } from 'react';
import { Card, Button, Typography, Flex } from "antd";
import type { IProduct } from "@/types/types";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
const [imgSrc, setImgSrc] = useState(product.imageUrl || "/no-image.webp");
  return (
    <Card
      hoverable
      style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}
      cover={
        <div style={{ position: 'relative', height: '180px', width: '100%' }}>
          <Image
            alt={product.name}
            src={imgSrc}
            fill
            style={{ objectFit: "cover" }}
            onError={() => setImgSrc("/no-image.webp")}
          />
        </div>
      }
    >
      <Flex vertical gap="middle">
        <Flex justify="space-between" align="flex-start">
          <Title level={5} style={{ margin: 0, maxWidth: '60%' }}>
            {product.name}
          </Title>
          <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
            {product.price} UAH
          </Text>
        </Flex>

        <Flex justify="flex-end">
          <Button 
            type="primary" 
            size="large"
            style={{ width: '160px', borderRadius: '8px' }}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}