import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Función para darle estilos al enlace activo
    const navLinkClass = ({ isActive }: { isActive: boolean }) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo / Marca */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/products" className="text-xl font-bold text-blue-600">
                            Finanzauto<span className="text-gray-800">App</span>
                        </Link>
                    </div>

                    {/* Menú de Navegación Central */}
                    <nav className="hidden md:flex space-x-4">
                        <NavLink to="/products" className={navLinkClass}>
                            Productos
                        </NavLink>
                        <NavLink to="/categories" className={navLinkClass}>
                            Categorías
                        </NavLink>
                        <NavLink to="/suppliers" className={navLinkClass}>
                            Proveedores
                        </NavLink>
                    </nav>

                    {/* Botón de Cerrar Sesión */}
                    <div className="flex items-center">
                        <button 
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;