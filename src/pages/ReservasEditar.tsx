import { useEffect, useRef, useState } from 'react';
import Huesped from '../types/Huesped';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
    parseToHuesped,
    parseToReserva,
    parseToStringRecord,
    recordsAreEqual,
    ReferentialIntegrityBuilder,
} from '../utils/EntityUtils';
import Reserva, { reservaVacia } from '../types/Reserva';
import { editRegistros, reservaExiste } from '../services/HTTPOperations';
import { ToastContainer, toast } from 'react-toastify';
import toastMaker from '../utils/ToastUtils';
import { getHuespedesByReservaId } from '../services/huesped/HuespedApi';
import { getReservaById } from '../services/reserva/ReservaApi';

const ReservasEditar = () => {
    const { id } = useParams();

    // para guardar los huespedes ya parseados
    const [dataHuespedes, setDataHuespedes] = useState<
        Record<string, string>[]
    >([]);
    // para guardar los datos introducidos en el formulario
    const [dataHuesped, setDataHuesped] = useState<Record<string, string>>({});
    // para guardar los datos introducidos en el formulario
    const [dataReserva, setDataReserva] = useState<Record<string, string>>({});

    const reservaInitialState = useRef<Record<string, string>>({});
    const huespedesInitialState = useRef<Record<string, string>[]>([]);
    const navigate = useNavigate();

    const validaciones = () => {
        // no creo que haya ninguna lmao
    };
    const handleBigSubmit = () => {
        try {
            validaciones();
        } catch (err: unknown) {
            if (err instanceof Error) {
                const notify = () => toast.error(err.message);
                notify();
            }
            return;
        }
        const reserva: Reserva = parseToReserva(dataReserva);
        const huespedes: Huesped[] = dataHuespedes.map(
            (huesped: Record<string, string>) => parseToHuesped(huesped)
        );
        console.log(reserva);
        console.log(huespedes);
        // ajusta los campos en huesped que dependen de reserva
        ReferentialIntegrityBuilder(reserva, huespedes);

        editRegistros(reserva, huespedes)
            .then((res) => {
                toastMaker(false, res);
                // te redirige a verlo
                setTimeout(
                    () =>
                        void navigate(
                            `/listar/reserva/${reserva.ReservationNumber}`
                        ),
                    1000
                );
            })
            .catch((err: Error) => toastMaker(true, err.message));
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const hayCambios =
                dataHuespedes.length > 0 ||
                recordsAreEqual(dataReserva, reservaVacia);
            if (hayCambios) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dataReserva, dataHuespedes.length]);

    // carga la reserva y sus huespedes
    useEffect(() => {
        if (!id) return;

        void Promise.allSettled([
            getReservaById(id),
            getHuespedesByReservaId(id),
        ]).then(([reservaRes, huespedesRes]) => {
            if (reservaRes.status === 'fulfilled') {
                setDataReserva(
                    parseToStringRecord(Object.entries(reservaRes.value))
                );
                // guarda el estado inicial de la reserva
                reservaInitialState.current = parseToStringRecord(
                    Object.entries(reservaRes.value)
                );
            } else {
                console.error('Error en getReservaById:', reservaRes.reason);
            }

            if (huespedesRes.status === 'fulfilled') {
                setDataHuespedes(
                    huespedesRes.value.map((huesped: Huesped) =>
                        parseToStringRecord(Object.entries(huesped))
                    )
                );
                // guarda el estado inicial de los huespedes
                huespedesInitialState.current = huespedesRes.value.map(
                    (huesped: Huesped) =>
                        parseToStringRecord(Object.entries(huesped))
                );
            } else {
                console.error(
                    'Error en getHuespedesByReservaId:',
                    huespedesRes.reason
                );
            }
        });
    }, [id]);

    const handleReservaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const exists = await reservaExiste(dataReserva.ReservationNumber);
        if (!exists) {
            throw new Error('La reserva ya no existe');
        } else {
            void navigate('huespedes');
        }
    };

    const forEdit = useRef(true);
    forEdit.current = true; // indica que estamos editando una reserva

    const [huespedEditedIndex, setHuespedEditedIndex] = useState<string | null>(
        null
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />

            <Outlet
                context={{
                    datosReserva: {
                        dataReserva,
                        setDataReserva,
                        handleReservaSubmit,
                    },
                    datosHuespedes: {
                        dataHuespedes,
                        setDataHuespedes,
                        dataHuesped,
                        setDataHuesped,
                        huespedEditedIndex,
                        setHuespedEditedIndex,
                    },
                    handleBigSubmit,
                    forEdit,
                }}
            />
        </div>
    );
};

export default ReservasEditar;
