import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductList from '../pages/ProductList';
import ProductForm from '../pages/ProductForm';
import AuthGuard from '../components/AuthGuard';
import CategoryList from '../pages/CategoryList';
import CategoryForm from '../pages/CategoryForm';
import Layout from '../components/Layout';
import SupplierList from '../pages/SupplierList';
import SupplierForm from '../pages/SupplierForm';
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🛡️ 1. Verificamos que tenga Token */}
            <Route element={<AuthGuard />}>
                
                {/* 🎨 2. Si tiene token, le aplicamos el diseño con Header y Footer */}
                <Route element={<Layout />}>
                    
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    
                    <Route path="/products">
                        <Route index element={<ProductList />} />
                        <Route path="new" element={<ProductForm />} />
                        <Route path="edit/:id" element={<ProductForm />} />
                    </Route>

                    <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="new" element={<CategoryForm />} />
                        <Route path="edit/:id" element={<CategoryForm />} />
                    </Route>

                    <Route path="/suppliers">
                        <Route index element={<SupplierList />} />
                        <Route path="new" element={<SupplierForm />} />
                        <Route path="edit/:id" element={<SupplierForm />} />
                    </Route>

                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRouter;