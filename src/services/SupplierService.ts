import api from '../api/axiosConfig';
import type { SupplierRequest, SupplierResponse } from '../types/Supplier';

export const SupplierService = {
    getAllSuppliers: async (): Promise<SupplierResponse[]> => {
        const response = await api.get<SupplierResponse[]>('/suppliers');
        return response.data;
    },

    getSupplierById: async (id: number): Promise<SupplierResponse> => {
        const response = await api.get<SupplierResponse>(`/suppliers/${id}`);
        return response.data;
    },

    // 🚨 Retorna un 'number' con el ID generado
    createSupplier: async (supplier: SupplierRequest): Promise<number> => {
        const response = await api.post<number>('/suppliers', supplier);
        return response.data;
    },

    updateSupplier: async (id: number, supplier: SupplierRequest): Promise<SupplierResponse> => {
        const response = await api.put<SupplierResponse>(`/suppliers/${id}`, supplier);
        return response.data;
    },

    deleteSupplier: async (id: number): Promise<void> => {
        await api.delete(`/suppliers/${id}`);
    }
};