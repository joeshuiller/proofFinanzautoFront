import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import { CategoryService } from '../services/CategoryService';
import { SupplierService } from '../services/SupplierService';
import type { ProductRequest } from '../types/Product';
import type { CategoryResponse } from '../types/Category';
import type { SupplierResponse } from '../types/Supplier';

const ProductForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductRequest>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isAddMode = !id;

    // 📦 Estados para almacenar las listas de los Selects
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 🚀 Promise.all carga las categorías y proveedores EN PARALELO (más rápido)
                const [categoriesData, suppliersData] = await Promise.all([
                    CategoryService.getAllCategories(),
                    SupplierService.getAllSuppliers()
                ]);
                
                setCategories(categoriesData);
                setSuppliers(suppliersData);

                // Si estamos en modo EDICIÓN, cargamos también el producto
                if (!isAddMode && id) {
                    const product = await ProductService.getProductById(Number(id));
                    
                    // Asignamos todos los valores al formulario
                    const fields: (keyof ProductRequest)[] = [
                        'productName', 'categoryId', 'supplierId', 'quantityPerUnit', 
                        'unitPrice', 'unitsInStock', 'unitsOnOrder', 'reorderLevel', 'discontinued'
                    ];
                    fields.forEach(field => setValue(field, product[field] as never));
                }
            } catch (error) {
                console.error("Error cargando datos iniciales", error);
                alert("Error al cargar los datos. Revisa la consola.");
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, [id, isAddMode, setValue]);

    const onSubmit = async (data: ProductRequest) => {
        try {
            if (isAddMode) {
                await ProductService.createProduct(data);
            } else {
                await ProductService.updateProduct(Number(id), data);
            }
            navigate('/products');
        } catch {
            alert("Hubo un error al guardar el producto.");
        }
    };

    // ==========================================
    // 🛠️ FUNCIONES RENDERIZADORAS LIMPIAS
    // ==========================================

    const renderInput = (label: string, name: keyof ProductRequest, type = "text", requiredMsg?: string) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type={type} 
                step={type === 'number' ? "any" : undefined}
                {...register(name, { 
                    required: requiredMsg,
                    // Si es número, React Hook Form lo convierte automáticamente para no enviar un String a Spring Boot
                    valueAsNumber: type === 'number' 
                })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
            {errors[name] && <span className="text-red-500 text-xs mt-1 block">{errors[name]?.message as string}</span>}
        </div>
    );

    const renderSelect = (label: string, name: keyof ProductRequest, options: {id: number, name: string}[], requiredMsg: string) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select 
                {...register(name, { required: requiredMsg, valueAsNumber: true })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
                <option value="">Seleccione una opción...</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
            </select>
            {errors[name] && <span className="text-red-500 text-xs mt-1 block">{errors[name]?.message as string}</span>}
        </div>
    );

    const renderCheckbox = (label: string, name: keyof ProductRequest) => (
        <div className="flex items-center mt-6">
            <input 
                type="checkbox" 
                {...register(name)} 
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer">{label}</label>
        </div>
    );

    // ==========================================

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Cargando formulario...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                
                <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isAddMode ? 'Registrar Nuevo Producto' : 'Actualizar Producto'}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* SECCIÓN 1: Identificación y Relaciones */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Principal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                {renderInput("Nombre del Producto", "productName", "text", "El nombre es obligatorio")}
                            </div>
                            
                            {/* 🚀 SELECTS DINÁMICOS */}
                            {renderSelect(
                                "Categoría", 
                                "categoryId", 
                                categories.map(c => ({ id: c.id, name: c.categoryName })), 
                                "Selecciona una categoría"
                            )}

                            {renderSelect(
                                "Proveedor", 
                                "supplierId", 
                                suppliers.map(s => ({ id: s.id, name: s.companyName })), 
                                "Selecciona un proveedor"
                            )}
                        </div>
                    </div>

                    {/* SECCIÓN 2: Precios e Inventario */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Inventario y Precios</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {renderInput("Precio Unitario ($)", "unitPrice", "number", "El precio es obligatorio")}
                            {renderInput("Stock Actual", "unitsInStock", "number", "El stock es obligatorio")}
                            {renderInput("Unidades en Orden", "unitsOnOrder", "number", "Este campo es obligatorio")}
                            {renderInput("Nivel de Reorden", "reorderLevel", "number", "Este campo es obligatorio")}
                            {renderInput("Cantidad por Unidad", "quantityPerUnit", "text")} {/* Es opcional */}
                            
                            <div className="md:col-span-1">
                                {renderCheckbox("¿Producto Descontinuado?", "discontinued")}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={() => navigate('/products')} 
                            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isAddMode ? 'Guardar Producto' : 'Actualizar Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;