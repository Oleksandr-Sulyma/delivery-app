"use client";

import { Row, Col, Spin, Modal } from "antd";
import { useEffect, useState, useCallback } from "react";
import toast from 'react-hot-toast';
import { shopService, productsService } from "@/services/api";
import { useCartStore } from "@/store/useCartStore";
import ShopList from "@/components/ShopList/ShopList";
import ProductList from "@/components/ProductList/ProductList";
import type { IShop, IProduct } from "@/types/types";

export default function Home() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [isLoadingShops, setIsLoadingShops] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const { cart, addToCart, resetAndAdd } = useCartStore();

  const showCartToast = (productName: string, isReset: boolean = false) => {
    const updatedCart = useCartStore.getState().cart;
    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    toast.success(
      <div>
        <b>{productName} added!</b> <br />
        <small>
          {isReset ? "Cart reset. " : ""}
          Now: {totalItems} item(s), Total: {totalPrice} UAH
        </small>
      </div>,
      { id: 'cart-toast' }
    );
  };

  const handleShopSelect = useCallback(async (id: string) => {
    setSelectedShopId(id);
    setIsLoadingProducts(true);
    try {
      const res: any = await productsService.getProductsByShop(id);
      const actualProducts = res?.data && Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res) ? res : []);
      
      setProducts(actualProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    shopService
      .getAllShops()
      .then((res: any) => {
        const actualShops = res?.data && Array.isArray(res.data) ? res.data : [];
        setShops(actualShops);
        setIsLoadingShops(false);

        if (actualShops.length > 0) {
          handleShopSelect(actualShops[0]._id);
        }
      })
      .catch((err) => {
        console.error("Failed to load shops:", err);
        setIsLoadingShops(false);
      });
  }, [handleShopSelect]);

  const handleAddToCart = (product: IProduct) => {
    const currentCart = useCartStore.getState().cart;

    if (currentCart.length > 0 && currentCart[0].shop !== product.shop) {
      Modal.confirm({
        title: 'Change shop?',
        content: 'Your cart already contains items from another shop. Do you want to clear your cart and add this item?',
        okText: 'Yes, clear and add',
        cancelText: 'Cancel',
        onOk: () => {
          resetAndAdd(product);
          setTimeout(() => showCartToast(product.name, true), 100);
        },
      });
      return;
    }

    addToCart(product);
    showCartToast(product.name);
  };

  if (isLoadingShops) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" description="Loading shops..." />
      </div>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <Row gutter={[32, 0]} style={{ alignItems: "stretch" }}>
        <Col span={6}>
          <ShopList
            shops={shops}
            selectedShopId={selectedShopId}
            onSelectShop={handleShopSelect}
          />
        </Col>

        <Col span={18}>
          <div
            style={{
              padding: "30px",
              border: "1px solid #d9d9d9",
              borderRadius: "12px",
              height: "calc(100vh - 120px)",
              overflowY: "auto",
              background: "#fff",
              position: "relative"
            }}
          >
            {isLoadingProducts ? (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Spin description="Loading menu..." />
              </div>
            ) : products.length > 0 ? (
              <ProductList
                products={products}
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div style={{ textAlign: "center", marginTop: "100px", color: "#bfbfbf" }}>
                {selectedShopId
                  ? "No products found for this shop."
                  : "Please select a shop from the sidebar to see the menu."}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </main>
  );
}