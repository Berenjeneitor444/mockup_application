import Huesped from '../../types/Huesped';
import HuespedSaveDTO from '../../types/HuespedSaveDTO';
import HuespedResponse from '../../types/HuespedResponse';
import apiClient from '../api/ApiClient';
import _ from 'lodash';

export async function postHuesped(huesped: Huesped) {
    // no me interesa enviar la firma
    delete huesped.Firma;
    delete huesped.IDHuesped;
    const huespedWrapper: HuespedSaveDTO = {
        d: huesped,
    };
    const response = await apiClient.post<HuespedResponse>(
        '/huespedes/crear',
        huespedWrapper
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.result;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getHuespedesByReservaId(
    reservationNumber: string,
    hotel: string
): Promise<Huesped[]> {
    const response = await apiClient.post<HuespedResponse>(
        '/huespedes/listar',
        {
            reservationNumber: reservationNumber,
            hotel: hotel,
        }
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.results;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}

export async function getHuespedById(
    IDHuesped: string,
    hotel: string
): Promise<Huesped> {
    const response = await apiClient.post<HuespedResponse>(
        `/huespedes/listar`,
        {
            IDHuesped: IDHuesped,
            hotel: hotel,
        }
    );
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
    const huespedExistente = await getHuespedById(
        huespedNuevo.IDHuesped as string,
        huespedNuevo.hotel as string
    );
    // si son iguales no lo actualizo (para no aplicarle la firma)
    if (_.isEqual(huespedExistente, huespedNuevo)) return;
    // clase wrapper necesaria para adaptarse al formato requerido
    const huespedWrapper: HuespedSaveDTO = {
        d: huespedNuevo,
    };
    const response = await apiClient.post<HuespedResponse>(
        '/huespedes/modificar',
        huespedWrapper
    );
    if (response.status === 200 && response.data.result === 'OK') {
        return response.data.result;
    } else {
        throw new Error(`Errors: ${response.data.errors.join(', ')}`);
    }
}
