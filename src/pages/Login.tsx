import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/AuthService';
import type { LoginRequest } from '../types/Auth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginRequest) => {
        try {
            setIsLoading(true);
            setAuthError(null);
            const response = await AuthService.login(data);
            localStorage.setItem('token', response.token);
            navigate('/products');
        } catch {
            setAuthError('Credenciales inválidas o error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
                    <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input 
                            type="text" 
                            {...register('email', { required: 'El usuario es obligatorio' })} 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            placeholder="ej. admin"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            {...register('password', { required: 'La contraseña es obligatoria' })} 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    {authError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {authError}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* 🚀 Aquí está la redirección al Registro */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;