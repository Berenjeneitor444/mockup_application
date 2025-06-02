export default interface Huesped {
    hotel?: string; // opcional porque lo pongo a pelo programaticamente despues
    reservationNumber?: string; // opcional porque lo pongo a pelo programaticamente despues
    DatosComunicacion?: {
        Descripcion?: string;
        Direccion?: string;
        CodigoPostal?: string;
        Poblacion?: string;
        Provincia?: string;
        ComunidadAutonoma?: string;
        Pais?: string;
        ApartadoCorreos?: string;
        Telefono?: string;
        TelefonoMovil?: string;
        FaxNumber?: string;
        EMail?: string;
    };
    HotelFactura?: string;
    NumReserva?: string;
    NumeroCliente?: string;
    IDHuesped: string; // Obligatorio
    TipoPersona?: string;
    Nombre_Pila?: string;
    Nombre?: string;
    Email?: string;
    FechaNacimiento?: string;
    PaisNacimiento?: string;
    TipoDocumento?: string;
    FechaExpedicion?: string;
    FechaCaducidad?: string;
    Edad?: string;
    IDDocumento?: string;
    TipoCliente?: string;
    Sexo?: string;
    AceptaInfo?: string;
    Repetidor?: string;
    Vip?: string;
    FechaEntrada?: string;
    FechaSalida?: string;
}

export const huespedVacio: Record<string, string> = {
    'DatosComunicacion.Descripcion': '',
    'DatosComunicacion.Direccion': '',
    'DatosComunicacion.CodigoPostal': '',
    'DatosComunicacion.Poblacion': '',
    'DatosComunicacion.Provincia': '',
    'DatosComunicacion.ComunidadAutonoma': '',
    'DatosComunicacion.Pais': '',
    'DatosComunicacion.ApartadoCorreos': '',
    'DatosComunicacion.Telefono': '',
    'DatosComunicacion.TelefonoMovil': '',
    'DatosComunicacion.FaxNumber': '',
    'DatosComunicacion.EMail': '',
    NumeroCliente: '',
    IDHuesped: '',
    TipoPersona: '',
    Nombre_Pila: '',
    Nombre: '',
    FechaNacimiento: '',
    PaisNacimiento: '',
    TipoDocumento: '',
    FechaExpedicion: '',
    FechaCaducidad: '',
    Edad: '',
    IDDocumento: '',
    TipoCliente: '',
    Sexo: '',
    AceptaInfo: '',
    Repetidor: '',
    Vip: '',
};
