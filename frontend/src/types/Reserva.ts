export default interface Reserva {
    hotel: string; // Obligatorio
    ReservationNumber: string; // Obligatorio
    checkoutRealized?: boolean;
    CheckIn?: string;
    Localizador?: string;
    HotelFactura?: string;
    NumReserva?: string;
    Bono?: string;
    Estado?: number;
    Habitacion?: string;
    THDescripcion?: string;
    THUso?: string;
    Seccion?: string;
    Tarifa?: string;
    AD?: number;
    NI?: number;
    JR?: number;
    CU?: number;
    PreCheckIn?: string;
    FechaEntrada?: string;
    FechaSalida?: string;
    MotivoViaje?: string;
    LlegadaHora?: string;
    THFactura?: string;
    Bienvenida?: string;
    FechaBienv?: string;
    HoraBienv?: string;
}
export const reservaVacia = {
    hotel: 'M1',
    ReservationNumber: '',
    checkoutRealized: 'false',
    CheckIn: '',
    Localizador: '',
    Bono: '',
    Estado: '',
    Habitacion: '',
    THDescripcion: '',
    THUso: '',
    Seccion: '',
    Tarifa: '',
    AD: '0',
    NI: '0',
    JR: '0',
    CU: '0',
    PreCheckIn: '',
    FechaEntrada: '',
    FechaSalida: '',
    MotivoViaje: '',
    LlegadaHora: '',
    THFactura: '',
    Bienvenida: '',
    FechaBienv: '',
    HoraBienv: '',
};
