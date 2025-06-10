import apiClient from '../api/ApiClient';
import ReservaResponse from '../../types/ReservaResponse';
import Reserva from '../../types/Reserva';
import ReservaFilter from '../../types/ReservaFilter';

export async function getReservaByHotel(hotel: string): Promise<Reserva[]> {
    const response = await apiClient.post<ReservaResponse>('/reserva/listar', {
        hotel: hotel,
    });

    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.reservations;
    } else {
        throw new Error(`Error: ${response.data.errors.join(', ')}`);
    }
}

export async function getReservasByFilters(
    reservaFilter: ReservaFilter
): Promise<Reserva[]> {
    const response = await apiClient.post<ReservaResponse>(
        '/reserva/listar',
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
    const response = await apiClient.post<ReservaResponse>(
        '/reserva/crear',
        reserva
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return 'Reserva creada con éxito';
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getReservaById(
    reservationNumber: string
): Promise<Reserva> {
    const response = await apiClient.post<ReservaResponse>('/reserva/listar', {
        ReservationNumber: reservationNumber,
    });
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.reservations[0];
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}
export async function editReserva(reserva: Reserva) {
    const response = await apiClient.post<ReservaResponse>(
        '/reserva/modificar',
        reserva
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.result;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}
