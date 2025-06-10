const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="font-termina mb-6 text-center text-4xl font-semibold text-gray-800">
                Gestor de Reservas
            </h1>
            <p className="mb-4 text-lg text-gray-600">
                Bienvenido al gestor de reservas, esta aplicación te permite
                crear, editar y listar reservas con sus respectivos huéspedes.
                Utiliza el menú de navegación para acceder a las diferentes
                funcionalidades.
            </p>
            <p className="mb-4 text-lg text-gray-600">
                Esta web tiene como unico objetivo de interactuar con los
                registros de la API mockup, diseñada para pruebas.
            </p>
        </div>
    );
};

export default Home;
