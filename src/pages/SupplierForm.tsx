import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { SupplierService } from '../services/SupplierService';
import type { SupplierRequest } from '../types/Supplier';

const SupplierForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SupplierRequest>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isAddMode = !id;

    useEffect(() => {
        if (!isAddMode && id) {
            SupplierService.getSupplierById(Number(id))
                .then((supplier) => {
                    const fields: (keyof SupplierRequest)[] = [
                        'companyName', 'contactName', 'contactTitle', 'address', 
                        'city', 'region', 'postalCode', 'country', 'phone', 'fax', 'homePage'
                    ];
                    fields.forEach(field => setValue(field, supplier[field]));
                })
                .catch(() => alert("Error al cargar datos del proveedor"));
        }
    }, [id, isAddMode, setValue]);

    const onSubmit = async (data: SupplierRequest) => {
        try {
            if (isAddMode) {
                await SupplierService.createSupplier(data);
            } else {
                await SupplierService.updateSupplier(Number(id), data);
            }
            navigate('/suppliers');
        } catch {
            alert("Hubo un error al guardar. Verifica la consola.");
        }
    };

    // 🚀 SOLUCIÓN: Ahora es una función normal de JS, no un Componente React
    const renderInput = (label: string, name: keyof SupplierRequest, requiredMsg?: string, type = "text") => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type={type} 
                {...register(name, { required: requiredMsg })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
            {errors[name] && <span className="text-red-500 text-xs mt-1 block">{errors[name]?.message as string}</span>}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                
                <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isAddMode ? 'Registrar Proveedor' : 'Actualizar Proveedor'}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* SECCIÓN 1: Datos de la Empresa */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Corporativa</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 🚀 Llamamos a la función con llaves {} */}
                            {renderInput("Nombre de la Empresa", "companyName", "La empresa es obligatoria")}
                            {renderInput("Página Web", "homePage")}
                        </div>
                    </div>

                    {/* SECCIÓN 2: Datos de Contacto */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Persona de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput("Nombre del Contacto", "contactName", "El contacto es obligatorio")}
                            {renderInput("Título / Email del Contacto", "contactTitle", "El título es obligatorio")}
                            {renderInput("Teléfono Principal", "phone", "El teléfono es obligatorio")}
                            {renderInput("Fax", "fax")}
                        </div>
                    </div>

                    {/* SECCIÓN 3: Ubicación */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación y Dirección</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-3">
                                {renderInput("Dirección Completa", "address", "La dirección es obligatoria")}
                            </div>
                            {renderInput("Ciudad", "city", "La ciudad es obligatoria")}
                            {renderInput("Región / Estado", "region", "La región es obligatoria")}
                            {renderInput("País", "country", "El país es obligatorio")}
                            {renderInput("Código Postal", "postalCode", "El código postal es obligatorio")}
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={() => navigate('/suppliers')} 
                            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isAddMode ? 'Guardar Proveedor' : 'Actualizar Proveedor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierForm;