'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, theme, App, Spin, Flex } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { shopsService, productsService } from '@/services/api';
import { useCartStore } from '@/store/useCartStore';
import { Shop, Product, PaginatedResponse } from '@/types';
import ShopSection from '@/components/ShopSection/ShopSection';
import ProductSection from '@/components/ProductSection/ProductSection';

export default function HomeClient() {
  const { modal } = App.useApp();
  const { token } = theme.useToken();
  const { cart, addToCart, removeFromCart, clearCart, isDarkMode } = useCartStore();

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

  const isInitialMount = useRef(true);

  // 1. Завантаження магазинів - використовуємо примітиви в залежностях, щоб уникнути циклу
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoadingShops(true);
      try {
        const response = await shopsService.getAllShops({
          minRating: ratingRange.min ?? undefined,
          maxRating: ratingRange.max ?? undefined,
        });

        const shopsArray = Array.isArray(response)
          ? response
          : (response as PaginatedResponse<Shop>).data;
        
        setShops(shopsArray);
      } catch (err) {
        toast.error('Failed to load shops');
      } finally {
        setIsLoadingShops(false);
      }
    };
    fetchShops();
  }, [ratingRange.min, ratingRange.max]); // КРИТИЧНО: тільки примітиви

  // 2. Встановлення дефолтного магазину
  useEffect(() => {
    if (shops.length > 0) {
      const isStillAvailable = shops.find((s) => s._id === selectedShopId);
      if (!selectedShopId || !isStillAvailable) {
        setSelectedShopId(shops[0]._id);
      }
    }
  }, [shops, selectedShopId]);

  // 3. Запит продуктів
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
          // Жорстка перевірка hasMore, щоб не смикати page=2, якщо прийшло менше 12 або все завантажено
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

  // 4. Скидання при зміні фільтрів
  useEffect(() => {
    if (!selectedShopId) return;
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [selectedShopId, selectedCategories, sortBy, sortOrder]);

  // 5. Пагінація (тільки для наступних сторінок)
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, false);
    }
  }, [currentPage, fetchProducts]); // Тільки currentPage в залежностях

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
    <main style={{ minHeight: '100vh', padding: '40px 0', background: isDarkMode ? '#141414' : '#f5f5f5' }}>
      <div className="container">
        <Row gutter={[24, 24]} align="stretch" style={{ display: 'flex' }}>
          <Col xs={24} md={8} lg={6}>
            <ShopSection
              shops={shops}
              selectedShopId={selectedShopId}
              isDarkMode={isDarkMode}
              isMobile={false}
              onShopSelect={(id) => {
                setSelectedShopId(id);
                setSelectedCategories([]);
                setCurrentPage(1);
              }}
              onRatingFilter={(min, max) => setRatingRange({ min, max })}
            />
          </Col>

          <Col xs={24} md={16} lg={18}>
            <ProductSection
              isLoading={isLoadingProducts}
              products={products}
              hasMore={hasMore}
              selectedShopId={selectedShopId}
              selectedCategories={selectedCategories}
              isDarkMode={isDarkMode}
              isMobile={false}
              onAddToCart={handleCartAction}
              onCategoryChange={(cats) => setSelectedCategories(cats)}
              onSortChange={handleSortChange}
              onLoadMore={handleLoadMore}
            />
          </Col>
        </Row>
      </div>
    </main>
  );
}