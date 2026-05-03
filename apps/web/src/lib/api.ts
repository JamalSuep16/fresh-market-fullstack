import axios from 'axios';

// Pastikan ada '/api' di ujungnya jika app.ts menggunakan prefix /api
const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getProducts = async () => {
  const response = await api.get('/products'); // Jadi: /api/products
  return response.data.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}`); // Jadi: /api/products/:slug
  return response.data.data;
};