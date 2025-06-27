import {
    parseNumeroCliente,
    parseSexo,
    parseTipoDocumento,
    parseTipoPersona,
} from '../utils/EntityUtils';
import Huesped from './Huesped';

interface HuespedResumen {
    IDHuesped: string;
    hotel?: string;
    Nombre_Pila?: string;
    Nombre?: string;
    Email?: string;
    TipoDocumento?: string;
    IDDocumento?: string;
    Edad?: string;
    Sexo?: string;
    reservationNumber?: string;
    Telefono?: string;
    Pais?: string;
    Repetidor?: string;
    TipoPersona?: string;
    NumeroCliente?: string;
    Firma?: string;
}

export default HuespedResumen;

export function getHuespedResumen(huesped: Huesped): HuespedResumen | null {
    if (!huesped) {
        return null;
    }

    return {
        IDHuesped: huesped.IDHuesped as string,
        Nombre_Pila: huesped.Nombre_Pila || 'N/A',
        NumeroCliente: parseNumeroCliente(huesped.NumeroCliente),
        Nombre: huesped.Nombre || 'N/A',
        Email: huesped?.DatosComunicacion?.EMail || 'N/A',
        TipoDocumento: parseTipoDocumento(huesped.TipoDocumento),
        IDDocumento: huesped.IDDocumento || 'N/A',
        Edad: huesped.Edad || 'N/A',
        Sexo: parseSexo(huesped.Sexo),
        reservationNumber: huesped.reservationNumber || 'N/A',
        Telefono: huesped?.DatosComunicacion?.Telefono || 'N/A',
        Pais: huesped?.DatosComunicacion?.Pais || 'N/A',
        Repetidor: huesped?.Repetidor === 'X' ? 'Sí' : 'No',
        TipoPersona: parseTipoPersona(huesped.TipoPersona),
        Firma: huesped.Firma ? 'Sí' : 'No',
        hotel: huesped.hotel,
    };
}
