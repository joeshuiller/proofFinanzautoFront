import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8090/api/v1', // Ajusta al puerto de tu API Spring Boot
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar el token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        // TypeScript nos obliga a validar que 'config.headers' exista antes de mutarlo
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default api;