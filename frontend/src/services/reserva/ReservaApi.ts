import apiClient from '../api/ApiClient';
import ReservaResponse from '../../types/ReservaResponse';
import Reserva from '../../types/Reserva';
import ReservaFilter from '../../types/ReservaFilter';
import ReservaSaveDTO from '../../types/ReservaSaveDTO';

export async function getReservasByFilters(
    reservaFilter: ReservaFilter
): Promise<Reserva[]> {
    const response = await apiClient.post<ReservaResponse>(
        '/reservas/lista',
        reservaFilter
    );

    if (response.status === 200 && response.data.result === 'OK') {
        for (const reserva of response.data.reservations) {
            console.log(reserva);
        }
        return response.data.reservations;
    } else {
        throw new Error(`Error: ${response.data.errors.join(', ')}`);
    }
}

export async function postReserva(reserva: Reserva) {
    const reservaWrapper: ReservaSaveDTO = {
        d: reserva,
    };
    const response = await apiClient.post<ReservaResponse>(
        '/reservas/crear',
        reservaWrapper
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return 'Reserva creada con éxito';
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getReservaById(
    reservationNumber: string,
    hotel: string
): Promise<Reserva> {
    const response = await apiClient.post<ReservaResponse>('/reservas/lista', {
        ReservationNumber: reservationNumber,
        hotel: hotel,
    });
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.reservations[0];
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}
export async function editReserva(reserva: Reserva) {
    const reservaWrapper: ReservaSaveDTO = {
        d: reserva,
    };
    const response = await apiClient.post<ReservaResponse>(
        '/reservas/modificar',
        reservaWrapper
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return 'Reserva editada con éxito';
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function reservaExiste(reservationNumber: string) {
    const response = await apiClient.get<boolean>(
        `/reservas/existe?reservationNumber=${reservationNumber}`
    );
    return response.data;
}
