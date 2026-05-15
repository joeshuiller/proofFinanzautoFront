import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupplierService } from '../services/SupplierService';
import type { SupplierResponse } from '../types/Supplier';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const data = await SupplierService.getAllSuppliers();
                setSuppliers(data);
            } catch (error) {
                console.error('Error cargando proveedores', error);
            } finally {
                setLoading(false);
            }
        };
        loadSuppliers();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
            try {
                await SupplierService.deleteSupplier(id);
                setSuppliers((prev) => prev.filter(s => s.id !== id));
            } catch {
                alert('Hubo un error al eliminar el proveedor.');
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Cargando proveedores...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Proveedores</h1>
                <button 
                    onClick={() => navigate('/suppliers/new')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    + Nuevo Proveedor
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Empresa</th>
                                <th className="px-6 py-4 font-medium">Contacto</th>
                                <th className="px-6 py-4 font-medium">País / Ciudad</th>
                                <th className="px-6 py-4 font-medium">Teléfono</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {suppliers.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No hay proveedores registrados</td></tr>
                            ) : (
                                suppliers.map((supplier) => (
                                    <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{supplier.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{supplier.companyName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{supplier.contactName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.country}, {supplier.city}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-3">
                                            <button onClick={() => navigate(`/suppliers/edit/${supplier.id}`)} className="text-blue-600 hover:text-blue-900 transition-colors">Editar</button>
                                            <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:text-red-900 transition-colors">Eliminar</button>
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

export default SupplierList;