import { AxiosError } from 'axios';
import Huesped from '../types/Huesped';
import Reserva from '../types/Reserva';
import { editHuesped, getHuespedById, postHuesped } from './huesped/HuespedApi';
import { editReserva, getReservaById, postReserva } from './reserva/ReservaApi';
import ReservaResponse from '../types/ReservaResponse';

export async function crearRegistros(reserva: Reserva, huespedes: Huesped[]) {
    await postReserva(reserva);
    for (const huesped of huespedes) {
        await postHuesped(huesped);
    }
    return 'Registros creados con éxito';
}

export async function editRegistros(reserva: Reserva, huespedes: Huesped[]) {
    console.log('reserva vieja: ', reserva);
    const reservaModified = await editReserva(reserva);
    console.log('reserva nueva', reservaModified);

    for (const huesped of huespedes) {
        console.log('huesped viejo: ', huesped);
        await editHuesped(huesped);
        console.log('huesped nuevo: ', huesped);
    }
    return 'Registros editados con éxito';
}

export async function reservaExiste(reservationNumber: string) {
    try {
        await getReservaById(reservationNumber);
        // si no tira error es que lo ha encontrado
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = error.response?.data as ReservaResponse;
            if (response?.result === 'KO') {
                return false;
            } else {
                throw error;
            }
        }
    }
}
export async function huespedExiste(IDHuesped: string) {
    try {
        await getHuespedById(IDHuesped);
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data);
        }
        return false;
    }
}
