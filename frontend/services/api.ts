import axios from 'axios';
import qs from 'qs';
import type {
  Product,
  Shop,
  GetProductsParams,
  GetShopParams,
  PaginatedResponse,
  OrderCreateData,
  OrderResponse,
  Coupon
} from '../types/index';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});

export const productsService = {
  getAllProducts: async (params: GetProductsParams): Promise<PaginatedResponse<Product>> => {
     const filteredParams = {
      ...params,
      category: params.category?.length ? params.category : undefined,
      ids: params.ids?.length ? params.ids : undefined,
    };

    const { data } = await api.get<PaginatedResponse<Product>>('/products', {
      params: filteredParams,
      paramsSerializer: p => qs.stringify(p, { arrayFormat: 'repeat' })
    });

    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
};

export const shopsService = {
  getAllShops: async (params?: GetShopParams): Promise<PaginatedResponse<Shop>> => {
     const response = await api.get<PaginatedResponse<Shop>>('/shops', {
        params: {
          sortBy: 'rating',
          sortOrder: 'desc',
          ...params
        }
      });
      return response.data;
}
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

export const couponService = {
  getAll: async (): Promise<Coupon[]> => {
    const { data } = await api.get('/coupons');
    return data;
  },

  validate: async (code: string): Promise<{ name: string; discount: number }> => {
    const { data } = await api.get(`/coupons/validate/${code}`);
    return data;
  }
};

export default api;
