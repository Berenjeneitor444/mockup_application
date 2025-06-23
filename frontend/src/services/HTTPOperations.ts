import Huesped from '../types/Huesped';
import Reserva from '../types/Reserva';
import { editHuesped, postHuesped } from './huesped/HuespedApi';
import { editReserva, postReserva } from './reserva/ReservaApi';

export async function crearRegistros(reserva: Reserva, huespedes: Huesped[]) {
    await postReserva(reserva);
    for (const huesped of huespedes) {
        await postHuesped(huesped);
    }
    return 'Registros creados con éxito';
}

export async function editRegistros(reserva: Reserva, huespedes: Huesped[]) {
    await editReserva(reserva);
    if (huespedes.length > 0) {
        console.log('huespedes a editar: ', huespedes);
        for (const huesped of huespedes) {
            await editHuesped(huesped);
        }
    } else console.log('no hay huespedes a editar');

    return 'Registros editados con éxito';
}
