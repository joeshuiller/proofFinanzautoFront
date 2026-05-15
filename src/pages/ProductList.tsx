import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import type { ProductResponse } from '../types/Product';

const ProductList = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await ProductService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error cargando productos', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await ProductService.deleteProduct(id);
                setProducts((prev) => prev.filter(p => p.id !== id));
            } catch {
                alert('Hubo un error al intentar eliminar.');
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Cargando inventario...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header de la página */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Inventario de Productos</h1>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/products/new')} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        + Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Nombre</th>
                                <th className="px-6 py-4 font-medium">Precio</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay productos registrados</td></tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.productName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.unitPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.unitsInStock > 10 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {product.unitsInStock} un.
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-3">
                                            <button onClick={() => navigate(`/products/edit/${product.id}`)} className="text-blue-600 hover:text-blue-900 transition-colors">Editar</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 transition-colors">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;