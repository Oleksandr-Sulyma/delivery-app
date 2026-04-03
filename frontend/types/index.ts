export type Category = 'Burgers' | 'Pizzas' | 'Drinks' | 'Sushi' | 'Desserts';

export interface Shop {
  _id: string;
  name: string;
  address: string;
  imageUrl?: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: Category;
  shop: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  lastSearch: { email: string; phone: string } | null;
  appliedCoupon: AppliedCoupon | null;
  isDarkMode: boolean;
  toggleTheme: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addManyItems: (newItems: CartItem[]) => void;
  clearCart: () => void;
  applyCoupon: (coupon: AppliedCoupon | null) => void;
  getTotalPrice: () => number;
  setLastSearch: (email: string, phone: string) => void;
}

export interface GetProductsParams {
  shopId?: string;
  category?: string[];
  ids?: string[];
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetShopParams {
  name?: string;
  minRating?: number;
  maxRating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderCreateData {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalPrice: number;
}

export interface OrderResponse extends OrderCreateData {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  name: string;
  code: string;
  discount: number;
  imageUrl?: string;
  isActive: boolean;
  expiresAt: string;
}
export interface AppliedCoupon {
  code: string;
  discount: number;
}
export interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (value: string) => void;
}

export interface ProductSectionProps {
  isLoading: boolean;
  products: Product[];
  hasMore: boolean;
  selectedShopId: string | null;
  selectedCategories: string[];
  isDarkMode: boolean;
  isMobile: boolean;
  onAddToCart: (product: Product) => void;
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (value: string) => void;
  onLoadMore: () => void;
}
