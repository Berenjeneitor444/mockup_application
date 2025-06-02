import { dateParser } from '../utils/DateUtils';
import Reserva from './Reserva';
export interface ReservaResumen {
    ReservationNumber: string;
    hotel: string;
    FechaEntrada?: string;
    Estado?: number | 'N/A';
    FechaSalida?: string;
    AD?: number | 'N/A';
    NI?: number | 'N/A';
    JR?: number | 'N/A';
    CU?: number | 'N/A';
    MotivoViaje?: string;
    Habitacion?: string;
}
export function getReservaResumen(
    reserva: Reserva | null
): ReservaResumen | null {
    if (!reserva) {
        return null;
    }
    return {
        ReservationNumber: reserva.ReservationNumber,
        hotel: reserva.hotel,
        FechaEntrada:
            dateParser(reserva.FechaEntrada)?.toLocaleDateString() || 'N/A',
        FechaSalida:
            dateParser(reserva.FechaSalida)?.toLocaleDateString() || 'N/A',
        AD: reserva?.AD ?? 0,
        NI: reserva?.NI ?? 0,
        JR: reserva?.JR ?? 0,
        CU: reserva?.CU ?? 0,
        MotivoViaje: reserva?.MotivoViaje || 'N/A',
        Habitacion: reserva?.Habitacion || 'N/A',
        Estado: reserva?.Estado || 'N/A',
    };
}
