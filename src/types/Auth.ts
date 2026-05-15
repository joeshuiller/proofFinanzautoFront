// Lo que enviamos al hacer Login
export interface LoginRequest {
    email: string;
    password: string;
}

// Lo que enviamos al crear un usuario nuevo
export interface RegisterRequest {
    name: string;
    password: string;
    email: string; // Asumiendo que tu backend pide un email para el registro
    // Agrega aquí más campos si tu Spring Boot los requiere (ej: nombre, apellido)
}

// Lo que nos devuelve tu API (El JWT)
export interface AuthResponse {
    token: string;
    tokenType: string;
    expiration: number;
}
export interface UserProfileResponse {
    id: number;
    name: string;
    email: string;
    uAuthorities: UserAuthority[];
    createAt: string;
    updateAt: string;
}
export interface UserAuthority {
    authority: string;
}