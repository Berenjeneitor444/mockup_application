import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Huesped from '../types/Huesped';
import HuespedView from '../components/display/HuespedView';
import { getHuespedById } from '../services/huesped/HuespedApi';
import Reserva from '../types/Reserva';
import { getReservaById } from '../services/reserva/ReservaApi';
import ReservaCardList from '../components/display/cards/ReservaCardList';
import { getReservaResumen, ReservaResumen } from '../types/ReservaResumen';

export default function HuespedDetalle() {
    const { id, idHuesped } = useParams();
    const [huesped, setHuesped] = useState<Huesped | null>(null);
    const [reserva, setReserva] = useState<Reserva | null>(null);
    const [error, setError] = useState<string[] | null>(null);

    useEffect(() => {
        if (!idHuesped) return;
        if (!id) return;

        void Promise.allSettled([
            getHuespedById(idHuesped),
            getReservaById(id),
        ]).then((results) => {
            const [huespedRes, reservaRes] = results;
            if (huespedRes.status === 'fulfilled') {
                setHuesped(huespedRes.value);
            } else {
                const errorMessage = `No se pudo obtener el huesped con ID ${idHuesped}`;
                setError((prev) => [
                    ...(prev?.filter((subPrev) => subPrev !== errorMessage) ??
                        []),
                    errorMessage,
                ]);
            }
            if (reservaRes.status === 'fulfilled') {
                setReserva(reservaRes.value);
            } else {
                const errorMessage = `No se pudo obtener la reserva con ID ${id}`;
                setError((prev) => [
                    ...(prev?.filter((subPrev) => subPrev !== errorMessage) ??
                        []),
                    errorMessage,
                ]);
            }
        });
    }, [idHuesped, id]);

    if (error)
        return (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                {error.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </div>
        );
    if (!huesped) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-row space-x-4">
                <div className="w-2/3">
                    <h2 className="font-termina mb-4 text-center text-2xl font-semibold text-gray-800">
                        Detalles del Huésped
                    </h2>
                    <HuespedView huesped={huesped} />
                </div>
                <div className="w-full lg:w-2/5">
                    <div className="sticky top-4">
                        <h3 className="mb-2 text-center text-lg font-semibold text-gray-700">
                            Reserva asociada
                        </h3>
                        <ReservaCardList
                            reservasResumen={Array.of(
                                getReservaResumen(reserva)
                            ).filter((r): r is ReservaResumen => r !== null)}
                            navModeOn={true}
                            // ACTUALMENTE SI NO LE PASAS UNA RESERVA ASOCIADA VALIDA NO CARGA EL HUESPED POR COMO ESTA MONTADA LA URL
                            // POR LO QUE ESTE MENSAJE NO SE MUESTRA
                            message="este huesped no tiene reserva"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
