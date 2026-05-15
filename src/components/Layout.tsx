import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            
            {/* El Outlet es donde se renderizarán los Productos o las Categorías */}
            <main className="flex-grow w-full">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Layout;