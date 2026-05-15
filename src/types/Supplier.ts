// Lo que enviamos a Spring Boot
export interface SupplierRequest {
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
}

// Lo que esperamos recibir en el listado
export interface SupplierResponse {
    id: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
    createAt?: string;
    updateAt?: string;
}