import api from '../api/axiosConfig';
import type { LoginRequest, RegisterRequest, AuthResponse, UserProfileResponse } from '../types/Auth';

export const AuthService = {
    
    // Iniciar Sesión
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        // Ajusta '/auth/login' si tu backend tiene otra ruta
        const response = await api.post<AuthResponse>('/users/login', credentials);
        return response.data;
    },

    // Registrar Usuario
    register: async (userData: RegisterRequest): Promise<UserProfileResponse> => {
        // Ajusta '/auth/register' según la ruta de tu controlador en Spring Boot
        const response = await api.post<UserProfileResponse>('/users/register', userData);
        return response.data;
    },

    // Cerrar Sesión (Lógica puramente de Frontend)
    logout: (): void => {
        localStorage.removeItem('token');
        // Opcional: Redirigir desde aquí si configuras el enrutador globalmente
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem('token');
        return !!token; // Devuelve true si existe un token, false si no
    }
};