import apiClient from './axios';

export async function getProducts() {
  const response = await apiClient.get('/products');
  return response.data.data;
}
