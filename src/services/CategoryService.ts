import api from '../api/axiosConfig';
import type { CategoryRequest, CategoryResponse } from '../types/Category';

export const CategoryService = {
    
    getAllCategories: async (): Promise<CategoryResponse[]> => {
        const response = await api.get<CategoryResponse[]>('/categories');
        return response.data;
    },

    getCategoryById: async (id: number): Promise<CategoryResponse> => {
        const response = await api.get<CategoryResponse>(`/categories/${id}`);
        return response.data;
    },

    // 🚨 Retorna un 'number' porque tu backend devuelve el ID generado (ej: 1)
    createCategory: async (category: CategoryRequest): Promise<number> => {
        const response = await api.post<number>('/categories', category);
        return response.data;
    },

    updateCategory: async (id: number, category: CategoryRequest): Promise<CategoryResponse> => {
        const response = await api.put<CategoryResponse>(`/categories/${id}`, category);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/categories/${id}`);
    }
};