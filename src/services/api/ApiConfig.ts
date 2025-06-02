// Parametros de conexión a la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const TIMEOUT = 5000;

// Configuración de headers comunes
const HEADERS = {
    'Content-Type': 'application/json', // Tipo de contenido
};

// Opciones comunes que se aplicarán a todas las solicitudes
const commonConfig = {
    baseURL: API_BASE_URL,
    timeout: TIMEOUT,
    headers: HEADERS,
};

export default commonConfig;
