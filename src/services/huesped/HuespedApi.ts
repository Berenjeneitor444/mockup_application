import Huesped from '../../types/Huesped';
import HuespedResponse from '../../types/HuespedResponse';
import apiClient from '../api/ApiClient';
import _ from 'lodash';

export async function postHuesped(huesped: Huesped) {
    // no me interesa enviar la firma
    delete huesped.Firma;
    const response = await apiClient.post<HuespedResponse>(
        '/huesped/crear',
        huesped
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.result;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getHuespedesByReservaId(
    reservationNumber: string
): Promise<Huesped[]> {
    const response = await apiClient.post<HuespedResponse>('/huesped/listar', {
        reservationNumber: reservationNumber,
    });
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.results;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getHuespedById(IDHuesped: string): Promise<Huesped> {
    const response = await apiClient.post<HuespedResponse>(`/huesped/listar`, {
        IDHuesped: IDHuesped,
    });
    if (response.status === 200 && response.data.result === 'OK') {
        if (response.data.results.length > 1) {
            throw new Error(
                `Error critico: la base de datos tiene PK repetidas`
            );
        }
        return response.data.results[0];
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function editHuesped(huespedNuevo: Huesped) {
    // obtengo el huesped existente
    delete huespedNuevo.Firma;
    const huespedExistente = await getHuespedById(huespedNuevo.IDHuesped);
    // si son iguales no lo actualizo (para no aplicarle la firma)
    if (_.isEqual(huespedExistente, huespedNuevo)) return;
    const response = await apiClient.post<HuespedResponse>(
        '/huesped/modificar',
        huespedNuevo
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.result;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}
