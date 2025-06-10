import React, { useEffect, useState, useMemo } from 'react';
import ReservaCardList from '../components/display/cards/ReservaCardList';
import Reserva from '../types/Reserva';
import { getReservasByFilters } from '../services/reserva/ReservaApi';
import { getReservaResumen, ReservaResumen } from '../types/ReservaResumen';
import FilterForm from '../components/filter/FilterForm';
import CampoForm from '../components/form/CampoForm';
import ReservaFilter from '../types/ReservaFilter';
import {
    parseToReservaFilter,
    parseToStringRecord,
} from '../utils/EntityUtils';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

const ReservasListar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [message, setMessage] = useState<string>('Seleccione algun filtro');

    const actualizarCampo = useMemo(() => {
        const debounced = debounce(
            (name: string, value: string | number | Date) => {
                setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set(name, String(value));
                    return newParams;
                });
            },
            500
        );
        return debounced;
    }, [setSearchParams]);

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setReservas([]);
        setMessage('Cargando...');
        const { name, value } = e.target;
        actualizarCampo(name, value);
    };

    const handleReset = () => {
        setSearchParams({});
    };
    const handleNoResults = (message: string) => {
        setReservas([]);
        setMessage(message);
    };
    useEffect(() => {
        const resetList = (message: string) => {
            setSearchParams({});
            setReservas([]);
            setMessage(message);
        };
        const filtros = parseToStringRecord(searchParams);
        if (Object.keys(filtros).length === 0) {
            resetList('Seleccione algun filtro');
            return;
        }
        const reservaFilter: ReservaFilter = parseToReservaFilter(filtros);
        setMessage('Cargando...');
        getReservasByFilters(reservaFilter)
            .then((res) => setReservas(res))
            .catch((err: Error) => handleNoResults(err.message));
    }, [searchParams, setSearchParams]);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-termina mb-4 text-center text-4xl font-semibold text-gray-800">
                    Listar Reservas
                </h1>
                <p className="font-termina mb-4 text-center text-gray-600">
                    Utiliza los filtros siguientes para listar reservas
                </p>
                <FilterForm titulo="Filtrar Reservas" onReset={handleReset}>
                    <>
                        <CampoForm label="Numero de Reserva">
                            <input
                                type="text"
                                name="ReservationNumber"
                                defaultValue={
                                    searchParams.get(
                                        'ReservationNumber'
                                    ) as string
                                }
                                placeholder="Introduce el numero de reserva"
                                maxLength={10}
                                minLength={10}
                                onChange={handleOnChange}
                            />
                        </CampoForm>
                        <CampoForm label="Hotel">
                            <select
                                name="hotel"
                                defaultValue={
                                    (searchParams.get('hotel') as string) || ''
                                }
                                onChange={handleOnChange}
                            >
                                <option value="">Seleccione un hotel</option>
                                <option value="M1">M1</option>
                                <option value="M2">M2</option>
                                <option value="M3">M3</option>
                                <option value="M4">M4</option>
                            </select>
                        </CampoForm>
                        <CampoForm label="Fecha de Entrada">
                            <input
                                type="date"
                                name="FechaEntrada"
                                defaultValue={
                                    searchParams.get('FechaEntrada') as string
                                }
                                onChange={handleOnChange}
                            />
                        </CampoForm>
                        <CampoForm label="Estado de la reserva">
                            <select
                                onChange={handleOnChange}
                                name="Estado"
                                defaultValue={
                                    (searchParams.get('Estado') as string) || ''
                                }
                            >
                                <option value={''}>Seleccione un estado</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </CampoForm>
                    </>
                </FilterForm>
            </div>
            <div className="container mx-auto px-4 py-8">
                <ReservaCardList
                    message={message}
                    reservasResumen={reservas
                        .map(getReservaResumen)
                        .filter((r): r is ReservaResumen => r !== null)}
                    navModeOn={true}
                />
            </div>
        </>
    );
};
export default ReservasListar;
