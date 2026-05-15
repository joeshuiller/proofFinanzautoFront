import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { CategoryRequest } from '../types/Category';
import { CategoryService } from '../services/CategoryService';

const CategoryForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoryRequest>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isAddMode = !id;

    useEffect(() => {
        if (!isAddMode && id) {
            CategoryService.getCategoryById(Number(id))
                .then((category) => {
                    setValue('categoryName', category.categoryName);
                    setValue('description', category.description);
                })
                .catch(() => alert("Error al cargar datos de la categoría"));
        }
    }, [id, isAddMode, setValue]);

    const onSubmit = async (data: CategoryRequest) => {
        try {
            if (isAddMode) {
                const newId = await CategoryService.createCategory(data);
                console.log("Categoría creada con ID:", newId);
            } else {
                await CategoryService.updateCategory(Number(id), data);
            }
            navigate('/categories');
        } catch {
            alert("Hubo un error al guardar. Verifica la consola.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                
                <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isAddMode ? 'Crear Nueva Categoría' : 'Actualizar Categoría'}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Categoría</label>
                        <input 
                            type="text" 
                            {...register('categoryName', { required: 'El nombre es obligatorio', maxLength: { value: 30, message: 'Máximo 30 caracteres' } })} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                        {errors.categoryName && <span className="text-red-500 text-xs mt-1 block">{errors.categoryName.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea 
                            rows={4}
                            {...register('description', { required: 'La descripción es obligatoria' })} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-xs mt-1 block">{errors.description.message}</span>}
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 mt-8">
                        <button 
                            type="button" 
                            onClick={() => navigate('/categories')} 
                            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isAddMode ? 'Guardar' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;