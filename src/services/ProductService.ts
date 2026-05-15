import api from '../api/axiosConfig';
import type { ProductResponse, ProductRequest } from '../types/Product';

export const ProductService = {
    getAllProducts: async (): Promise<ProductResponse[]> => {
        const response = await api.get<ProductResponse[]>('/products');
        return response.data;
    },

    getProductById: async (id: number): Promise<ProductResponse> => {
        const response = await api.get<ProductResponse>(`/products/${id}`);
        return response.data;
    },

    createProduct: async (product: ProductRequest): Promise<ProductResponse> => {
        const response = await api.post<ProductResponse>('/products', product);
        return response.data;
    },

    updateProduct: async (id: number, product: ProductRequest): Promise<ProductResponse> => {
        const response = await api.put<ProductResponse>(`/products/${id}`, product);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    }
};