import { Link, useLocation } from 'react-router-dom';

const NoMatch = () => {
    const location = useLocation();

    return (
        <div className="container mx-auto flex flex-col items-center px-4 py-8">
            <h1 className="font-termina mb-8 text-center text-4xl font-semibold text-gray-800">
                No hay nada aquí...
            </h1>
            <p className="font-termina mb-8 text-center text-gray-600">
                La ruta{' '}
                <code className="text-primary">{location.pathname}</code> no
                existe.
            </p>
            <Link
                to="/"
                className="font-termina bg-secondary hover:bg-secondary-hover mt-4 rounded px-4 py-2 text-white transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default NoMatch;
