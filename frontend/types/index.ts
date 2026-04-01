export type Category = 'Burgers' | 'Pizzas' | 'Drinks' | 'Sushi' | 'Desserts';

export interface Shop {
  _id: string;
  name: string;
  address: string;
  imageUrl: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
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
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addManyItems: (newItems: CartItem[]) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  setLastSearch: (email: string, phone: string) => void;
}

export interface GetProductsParams {
  shopId?: string;
  category?: string;
  ids?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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