import { Row, Col } from "antd";
import type { IProduct } from "@/types/types";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  products: IProduct[];
  onAddToCart: (product: IProduct) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <Row gutter={[30, 30]}>
      {products.map((product) => (
        <Col span={12} key={product._id}>
          <ProductCard product={product} onAddToCart={onAddToCart}/>
        </Col>
      ))}
    </Row>
  );
}
