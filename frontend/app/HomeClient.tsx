"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, theme, Typography, App, Spin, Flex, Grid } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { shopsService, productsService } from '@/services/api';
import { useCartStore } from '@/store/useCartStore';
import { Shop, Product, PaginatedResponse } from '@/types';
import ShopSection from '@/components/ShopSection/ShopSection';
import ProductSection from '@/components/ProductSection/ProductSection';

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function HomeClient() {
  const { modal } = App.useApp();
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [isLoadingShops, setIsLoadingShops] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [ratingRange, setRatingRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });

  const productsRef = useRef<HTMLDivElement>(null);
  const isDesktop = screens.xl;

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoadingShops(true);
      try {
        const response = await shopsService.getAllShops({
          minRating: ratingRange.min ?? undefined,
          maxRating: ratingRange.max ?? undefined,
        });
        const shopsArray = Array.isArray(response) ? response : (response as PaginatedResponse<Shop>).data;
        setShops(shopsArray);
      } catch (err) {
        toast.error('Failed to load shops');
      } finally {
        setIsLoadingShops(false);
      }
    };
    fetchShops();
  }, [ratingRange.min, ratingRange.max]);

  useEffect(() => {
    if (shops.length > 0 && !selectedShopId) {
      setSelectedShopId(shops[0]._id);
    }
  }, [shops, selectedShopId]);

  const fetchProducts = useCallback(
    async (pageToFetch: number, isInitial: boolean) => {
      if (!selectedShopId || isLoadingProducts) return;
      if (!hasMore && !isInitial) return;
      setIsLoadingProducts(true);
      try {
        const response = await productsService.getAllProducts({
          shopId: selectedShopId,
          page: pageToFetch,
          perPage: 12,
          category: selectedCategories.length > 0 ? selectedCategories : undefined,
          sortBy,
          sortOrder,
        });
        const newProducts = response.data || [];
        const total = response.totalItems || 0;
        setProducts((prev) => {
          const finalProducts = isInitial ? newProducts : [...prev, ...newProducts];
          setHasMore(finalProducts.length < total && newProducts.length === 12);
          return finalProducts;
        });
      } catch (error) {
        setHasMore(false);
        toast.error('Error loading products');
      } finally {
        setIsLoadingProducts(false);
      }
    },
    [selectedShopId, selectedCategories, sortBy, sortOrder, isLoadingProducts, hasMore]
  );

  useEffect(() => {
    if (!selectedShopId) return;
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [selectedShopId, selectedCategories, sortBy, sortOrder]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, false);
    }
  }, [currentPage, fetchProducts]);

  const handleShopSelect = (id: string) => {
    setSelectedShopId(id);
    setSelectedCategories([]);
    setCurrentPage(1);

    if (!isDesktop && productsRef.current) {
      const headerOffset = 70;
      const elementPosition = productsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingProducts && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleCartAction = (product: Product) => {
    const isInCart = cart.some((item) => item._id === product._id);
    if (isInCart) {
      removeFromCart(product._id);
      toast.success(`${product.name} removed`);
      return;
    }
    if (cart.length > 0 && cart[0].shop !== product.shop) {
      modal.confirm({
        title: 'Change shop?',
        icon: <ExclamationCircleOutlined />,
        content: 'Clear cart to add items from a different shop?',
        okText: 'Clear & Add',
        onOk: () => {
          clearCart();
          addToCart(product);
        },
      });
      return;
    }
    addToCart(product);
  };

  const handleSortChange = (val: string) => {
    const [field, order] = val.split('-');
    setSortBy(field);
    setSortOrder(order as 'asc' | 'desc');
    setCurrentPage(1);
  };

  if (isLoadingShops && shops.length === 0) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '20px 0' }}>
         {/* Заголовок H1 (Hero block) */}
        <div style={{
          marginBottom: isDesktop ? '32px' : '24px',
          padding: '0 10px',
          textAlign: isDesktop ? 'left' : 'center'
        }}>
          <Title
            level={1}
            style={{
              margin: 0,
              fontSize: isDesktop ? '38px' : '28px',
              fontWeight: 850,
              letterSpacing: '-1px',
              color: token.colorText
            }}
          >
            Your Favorite Food, Delivered Fast 🚀
          </Title>
          <Text
            style={{
              fontSize: isDesktop ? '18px' : '16px',
              color: token.colorTextSecondary,
              display: 'block',
              marginTop: '8px'
            }}
          >
            Choose a shop and order the best local dishes directly to your door.
          </Text>
        </div>
      <div className="container">
        {isDesktop ? (
          <Row gutter={[24, 24]} align="stretch">
            <Col span={6}>
              <ShopSection
                shops={shops}
                selectedShopId={selectedShopId}
                onShopSelect={handleShopSelect}
                onRatingFilter={(min, max) => setRatingRange({ min, max })}
              />
            </Col>
            <Col span={18}>
              <ProductSection
                isLoading={isLoadingProducts}
                products={products}
                hasMore={hasMore}
                selectedShopId={selectedShopId}
                selectedCategories={selectedCategories}
                onAddToCart={handleCartAction}
                onCategoryChange={(cats) => setSelectedCategories(cats)}
                onSortChange={handleSortChange}
                onLoadMore={handleLoadMore}
              />
            </Col>
          </Row>
        ) : (
          <Flex vertical gap={24}>
            <ShopSection
              shops={shops}
              selectedShopId={selectedShopId}
              onShopSelect={handleShopSelect}
              onRatingFilter={(min, max) => setRatingRange({ min, max })}
            />
            <div ref={productsRef}>
              <ProductSection
                isLoading={isLoadingProducts}
                products={products}
                hasMore={hasMore}
                selectedShopId={selectedShopId}
                selectedCategories={selectedCategories}
                onAddToCart={handleCartAction}
                onCategoryChange={(cats) => setSelectedCategories(cats)}
                onSortChange={handleSortChange}
                onLoadMore={handleLoadMore}
              />
            </div>
          </Flex>
        )}
      </div>
    </main>
  );
}


