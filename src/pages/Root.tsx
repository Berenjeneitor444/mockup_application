import { Link, Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="flex h-full flex-col xl:flex-row">
            {/* Barra lateral/superior */}
            <nav className="bg-primary sticky top-0 w-full p-4 xl:w-80">
                <div className="flex items-center xl:h-full">
                    <ul className="flex w-full justify-around space-x-4 xl:flex-col xl:justify-start xl:space-y-6 xl:space-x-0">
                        <li className="hover:text-secondary text-xl text-white xl:text-3xl">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-secondary text-xl text-white xl:text-3xl">
                            <Link to="/crear">Crear Reserva</Link>
                        </li>
                        <li className="hover:text-secondary text-xl text-white xl:text-3xl">
                            <Link to="/listar">Listar Reservas</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className="h-screen flex-1 overflow-scroll bg-white p-6">
                <div className="rounded-lg p-6 shadow-md">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Root;
