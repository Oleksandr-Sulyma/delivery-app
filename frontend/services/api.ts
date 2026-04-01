import axios from 'axios';
import type { 
  Product, 
  Shop, 
  GetProductsParams, 
  PaginatedResponse, 
  OrderCreateData,
  OrderResponse
} from '../types/index';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});

export const productsService = {
  getAllProducts: async (params: GetProductsParams): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get<PaginatedResponse<Product>>('/products', { 
      params: {
        sortBy: 'createdAt',
        sortOrder: 'desc',
        ...params 
      } 
    });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
};

export const shopsService = {
  getAllShops: async (params?: { 
    name?: string; 
    minRating?: number; 
    maxRating?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<Shop[]> => {
    try {
      const response = await api.get<any>('/shops', {
        params: {
          sortBy: 'rating',
          sortOrder: 'desc',
          ...params
        }
      });

      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error("Error fetching shops:", error);
      return [];
    }
  },
};

export const orderService = {
  createOrder: async (orderData: OrderCreateData): Promise<OrderResponse> => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  getOrderHistory: async (email: string, phone: string): Promise<OrderResponse[]> => {
    const { data } = await api.get('/orders/history', {
      params: { email, phone }
    });
    return data;
  },

  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  }
};

export default api;