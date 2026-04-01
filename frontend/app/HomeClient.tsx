"use client";

import { useState, useEffect, useCallback } from "react";
import { Row, Col, Spin, Modal, Flex, Pagination, Empty } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import ShopList from "@/components/ShopList/ShopList";
import ProductList from "@/components/ProductList/ProductList";
import { shopsService, productsService } from "@/services/api";
import { useCartStore } from "@/store/useCartStore";
import { Shop, Product, PaginatedResponse } from "@/types";

const { confirm } = Modal;

export default function HomeClient() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [productsData, setProductsData] =
    useState<PaginatedResponse<Product> | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [isLoadingShops, setIsLoadingShops] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [ratingRange, setRatingRange] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const notify = (
    title: string,
    message: string,
    type: "success" | "error" = "success",
  ) => {
    toast[type](
      <div>
        <b>{title}</b> <br />
        <small>{message}</small>
      </div>,
      { id: "cart-toast" },
    );
  };

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoadingShops(true);
      try {
        const params = {
          minRating: ratingRange.min ?? undefined,
          maxRating: ratingRange.max ?? undefined,
        };

        const response = await shopsService.getAllShops(params);
        const shopsArray = Array.isArray(response)
          ? response
          : (response as any).data;

        if (Array.isArray(shopsArray)) {
          setShops(shopsArray);
          if (
            shopsArray.length > 0 &&
            (!selectedShopId ||
              !shopsArray.find((s) => s._id === selectedShopId))
          ) {
            setSelectedShopId(shopsArray[0]._id);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load shops");
      } finally {
        setIsLoadingShops(false);
      }
    };
    fetchShops();
  }, [ratingRange]);

  const fetchProducts = useCallback(async () => {
    if (!selectedShopId) return;
    setIsLoadingProducts(true);
    try {
      const response = await productsService.getAllProducts({
        shopId: selectedShopId,
        page: currentPage,
        perPage: 10,
        category,
        sortBy,
        sortOrder,
      });
      setProductsData(response);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoadingProducts(false);
    }
  }, [selectedShopId, currentPage, category, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCartAction = (product: Product) => {
    const isInCart = cart.some((item) => item._id === product._id);

    if (isInCart) {
      removeFromCart(product._id);
      notify("Removed from cart", `${product.name} has been removed.`);
      return;
    }

    if (cart.length > 0 && cart[0].shop !== product.shop) {
      confirm({
        title: "Change shop?",
        icon: <ExclamationCircleOutlined />,
        content:
          "Your cart already contains items from another shop. Clear it to add this item?",
        okText: "Clear & Add",
        cancelText: "Cancel",
        onOk: () => {
          clearCart();
          addToCart(product);
          notify("Cart updated", `${product.name} added.`);
        },
      });
      return;
    }

    addToCart(product);
    notify("Added to cart", `${product.name} added.`);
  };

  const handleShopSelect = (id: string) => {
    setSelectedShopId(id);
    setCurrentPage(1);
  };

  const handleRatingFilter = (min: number | null, max: number | null) => {
    setRatingRange({ min, max });
    setCurrentPage(1);
  };

  if (isLoadingShops && shops.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #d9d9d9",
              borderRadius: "12px",
              background: "#fff",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
            }}
          >
            <ShopList
              shops={shops}
              selectedShopId={selectedShopId}
              onSelectShop={handleShopSelect}
              onFilterChange={handleRatingFilter}
            />
          </div>
        </Col>

        <Col xs={24} md={18}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #d9d9d9",
              borderRadius: "12px",
              background: "#fff",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            {isLoadingProducts ? (
              <Flex
                justify="center"
                align="center"
                style={{ minHeight: "400px" }}
              >
                <Spin size="large" />
              </Flex>
            ) : productsData && productsData.data.length > 0 ? (
              <Flex vertical gap="large">
                <ProductList
                  products={productsData.data}
                  onAddToCart={handleCartAction}
                />
                <Flex justify="center" style={{ marginTop: "20px" }}>
                  <Pagination
                    current={currentPage}
                    total={productsData.totalItems}
                    pageSize={10}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                  />
                </Flex>
              </Flex>
            ) : (
              <Empty
                description={
                  selectedShopId ? "No products found" : "Select a shop"
                }
              />
            )}
          </div>
        </Col>
      </Row>
    </main>
  );
}
