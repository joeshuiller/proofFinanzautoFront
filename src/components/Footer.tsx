const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start">
                        <p className="text-sm text-gray-500">
                            &copy; {currentYear} Finanzauto Prueba Técnica. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="flex justify-center mt-4 md:mt-0 space-x-6">
                        <span className="text-sm text-gray-400">
                            Desarrollado con React & Tailwind
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;