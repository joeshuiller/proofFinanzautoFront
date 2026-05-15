import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CategoryResponse } from '../types/Category';
import { CategoryService } from '../services/CategoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await CategoryService.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error cargando categorías', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await CategoryService.deleteCategory(id);
                setCategories((prev) => prev.filter(c => c.id !== id));
            } catch {
                alert('No se puede eliminar porque tiene productos asociados o hubo un error.');
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Cargando categorías...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Categorías</h1>
                <button 
                    onClick={() => navigate('/categories/new')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    + Nueva Categoría
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Nombre</th>
                                <th className="px-6 py-4 font-medium">Descripción</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No hay categorías registradas</td></tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{category.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{category.categoryName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{category.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-3">
                                            <button onClick={() => navigate(`/categories/edit/${category.id}`)} className="text-blue-600 hover:text-blue-900 transition-colors">Editar</button>
                                            <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900 transition-colors">Eliminar</button>
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

export default CategoryList;