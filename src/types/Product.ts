// Lo que nos devuelve tu API (con ID y fechas)
export interface ProductResponse {
    id: number;
    productName: string;
    categoryId: number;
    supplierId?: number; // El '?' significa que es opcional (puede venir nulo)
    quantityPerUnit?: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    createAt?: string;
    updateAt?: string;
}

// Lo que nosotros le enviamos a tu API para crear o actualizar
export interface ProductRequest {
    productName: string;
    categoryId: number;
    supplierId?: number;
    quantityPerUnit?: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    createAt?: string;
    updateAt?: string;
}