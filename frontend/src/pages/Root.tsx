import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Root = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="flex h-full flex-col xl:flex-row">
            {/* Botón hamburguesa para móviles */}
            <button
                onClick={toggleNav}
                className="bg-primary hover:bg-opacity-90 fixed top-4 left-4 z-50 rounded-md p-2 text-white shadow-lg transition-colors xl:hidden"
                aria-label="Toggle navigation"
            >
                {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para móviles */}
            {isNavOpen && (
                <div
                    className="bg-opacity-50 fixed inset-0 z-30 backdrop-brightness-50 xl:hidden"
                    onClick={toggleNav}
                />
            )}

            {/* Barra lateral/superior */}
            <nav
                className={`bg-primary fixed top-0 left-0 z-40 h-full w-80 transform p-4 transition-transform duration-300 ease-in-out xl:sticky xl:h-auto xl:w-80 xl:transform-none ${isNavOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'} flex flex-col`}
            >
                {/* Sección del logo */}
                <div className="flex items-center justify-center py-6 xl:py-8">
                    {/* Aquí puedes agregar tu logo */}
                    <img
                        src="/assets/majestic_logo.png"
                        alt="Logo"
                        className="h-auto w-62"
                    />
                </div>

                {/* Línea separadora */}
                <div className="border-opacity-20 mb-6 border-t border-white"></div>

                {/* Navegación */}
                <div className="flex flex-1 items-start justify-center">
                    <ul className="mt-10 flex w-full flex-col space-y-6">
                        <li className="hover:text-secondary font-termina text-xl text-white transition-colors duration-200 xl:text-3xl">
                            <Link
                                to="/"
                                onClick={() => setIsNavOpen(false)}
                                className="hover:bg-opacity-10 block rounded-md px-4 py-2 hover:bg-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-secondary font-termina text-xl text-white transition-colors duration-200 xl:text-3xl">
                            <Link
                                to="/crear"
                                onClick={() => setIsNavOpen(false)}
                                className="hover:bg-opacity-10 block rounded-md px-4 py-2 hover:bg-white"
                            >
                                Crear Reserva
                            </Link>
                        </li>
                        <li className="hover:text-secondary font-termina text-xl text-white transition-colors duration-200 xl:text-3xl">
                            <Link
                                to="/listar"
                                onClick={() => setIsNavOpen(false)}
                                className="hover:bg-opacity-10 block rounded-md px-4 py-2 hover:bg-white"
                            >
                                Listar Reservas
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Información adicional en la parte inferior (opcional) */}
                <div className="border-opacity-20 mt-auto border-t border-white pt-6">
                    <p className="font-termina text-center text-sm font-light text-white opacity-70">
                        Sistema de Reservas
                    </p>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className="h-screen flex-1 bg-white p-6 xl:ml-0 xl:overflow-scroll">
                {/* Espaciado adicional en móviles para el botón hamburguesa */}
                <div className="h-16 xl:hidden"></div>

                <div className="rounded-lg p-6 shadow-md">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Root;
