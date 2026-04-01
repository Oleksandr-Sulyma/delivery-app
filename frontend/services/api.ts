import axios from 'axios';
import type { IProduct, IShop } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const shopService = {
  getAllShops: async (): Promise<IShop[]> => {
    const { data } = await api.get<IShop[]>('/shops');
    return data; 
  }
};

export const productsService = {
    getProductsByShop: async (id:string): Promise<IProduct[]> => {
        const { data } = await api.get<IProduct[]>(`/shops/${id}/products`);
        return data;

    }
}

export default api;