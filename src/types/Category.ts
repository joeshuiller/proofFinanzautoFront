// Lo que enviamos a Spring Boot para crear/editar
export interface CategoryRequest {
    categoryName: string;
    description: string;
}

// Lo que esperamos recibir al consultar la lista completa
export interface CategoryResponse {
    id: number;
    categoryName: string;
    description: string;
    createAt?: string;
    updateAt?: string;
}