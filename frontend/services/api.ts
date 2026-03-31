import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const shopService = {
  getAllShops: async () => {
    const response = await api.get('/shops');
    return response.data; 
  }
};

export default api;