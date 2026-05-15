import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // El 'replace' evita que el usuario regrese a la ruta protegida usando el botón de "Atrás"
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;