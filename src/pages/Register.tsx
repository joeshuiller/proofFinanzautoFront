import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/AuthService';
import type { RegisterRequest } from '../types/Auth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterRequest) => {
        try {
            setIsLoading(true);
            setRegisterError(null);
            
            // Enviamos los datos al backend
            const response = await AuthService.register(data);
            
            // Asumiendo que el registro exitoso también devuelve un JWT
            if (response) {
                navigate('/login');
            }
            
            
        } catch {
            setRegisterError('El usuario ya existe o hubo un problema en el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
                    <p className="text-gray-500 mt-2">Completa tus datos para registrarte</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input 
                            type="text" 
                            {...register('name', { 
                                required: 'El usuario es obligatorio',
                                minLength: { value: 4, message: 'Debe tener al menos 4 caracteres' }
                            })} 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            placeholder="Tu nombre de usuario"
                        />
                        {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            {...register('email', { 
                                required: 'El correo es obligatorio',
                                pattern: { value: /^\S+@\S+$/i, message: 'Formato de correo inválido' }
                            })} 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            placeholder="ejemplo@correo.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            {...register('password', { 
                                required: 'La contraseña es obligatoria',
                                minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' }
                            })} 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    {registerError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {registerError}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                {/* Enlace para volver al Login */}
                <div className="text-center mt-6 border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;