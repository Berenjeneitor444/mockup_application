import config from './ApiConfig';
import axios from 'axios';

// Configuración de axios con las opciones globales
const apiClient = axios.create(config);
apiClient.interceptors.request.use(
    (config) => {
        const username = import.meta.env.VITE_API_USER as string;
        const password = import.meta.env.VITE_API_PASSWORD as string;
        const token = btoa(`${username}:${password}`);

        if (config.headers) {
            config.headers['Authorization'] = `Basic ${token}`;
        } else {
            config.headers = new axios.AxiosHeaders({
                Authorization: `Basic ${token}`,
            });
        }

        return config;
    },
    (error) =>
        error instanceof Error
            ? Promise.reject(error)
            : Promise.reject(new Error('Error en la solicitud'))
);
export default apiClient;
