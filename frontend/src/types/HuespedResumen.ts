import Huesped from './Huesped';

interface HuespedResumen {
    IDHuesped: string;
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
    TipoCliente?: string;
    Firma?: string;
}

export default HuespedResumen;

export function getHuespedResumen(huesped: Huesped): HuespedResumen | null {
    if (!huesped) {
        return null;
    }
    let sexo: string;

    switch (huesped.Sexo) {
        case '1':
            sexo = 'Masculino';
            break;
        case '2':
            sexo = 'Femenino';
            break;
        default:
            sexo = 'N/A';
    }
    return {
        IDHuesped: huesped.IDHuesped,
        Nombre_Pila: huesped.Nombre_Pila || 'N/A',
        Nombre: huesped.Nombre || 'N/A',
        Email: huesped?.DatosComunicacion?.EMail || 'N/A',
        TipoDocumento: huesped.TipoDocumento || 'N/A',
        IDDocumento: huesped.IDDocumento || 'N/A',
        Edad: huesped.Edad || 'N/A',
        Sexo: sexo,
        reservationNumber: huesped.reservationNumber || 'N/A',
        Telefono: huesped?.DatosComunicacion?.Telefono || 'N/A',
        Pais: huesped?.DatosComunicacion?.Pais || 'N/A',
        Repetidor: huesped?.Repetidor === 'X' ? 'Sí' : 'No',
        TipoCliente: huesped.TipoCliente || 'N/A',
        Firma: huesped.Firma ? 'Sí' : 'No',
    };
}
