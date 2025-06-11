import { useEffect, useRef, useState } from 'react';
import Huesped from '../types/Huesped';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    parseToHuesped,
    parseToReserva,
    parseToStringRecord,
    objectsAreEqual,
    ReferentialIntegrityBuilder,
    cleanObject,
} from '../utils/EntityUtils';
import Reserva from '../types/Reserva';
import { editRegistros, reservaExiste } from '../services/HTTPOperations';
import { ToastContainer } from 'react-toastify';
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

    const reservaInitialState = useRef<Reserva>(null);
    const huespedesInitialState = useRef<Huesped[]>([]);
    const navigate = useNavigate();

    const [error, setError] = useState<string[] | null>(null);
    const [fullCreationMode, setFullCreationMode] = useState<boolean | null>(
        null
    );
    const location = useLocation();
    const handleBigSubmit = () => {
        const reserva: Reserva = parseToReserva(dataReserva);
        let huespedesCambiados: Huesped[] = [];
        if (dataHuespedes.length > 0) {
            const huespedes: Huesped[] = dataHuespedes.map(
                (huesped: Record<string, string>) => parseToHuesped(huesped)
            );
            // ajusta los campos en huesped que dependen de reserva
            ReferentialIntegrityBuilder(reserva, huespedes);

            // filtrar los huespedes que no han cambiado para no firmarlos en el backend
            huespedesCambiados = huespedes.filter((huesped, index) => {
                console.log(
                    `huespedesInitialState.current[${index}]`,
                    huespedesInitialState.current[index]
                );
                console.log('huesped', huesped);
                return !objectsAreEqual(
                    huesped,
                    huespedesInitialState.current[index]
                );
            });
        }

        editRegistros(reserva, huespedesCambiados)
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
        const handleFormIntegrity = () => {
            if (fullCreationMode === null && location.pathname !== '/editar') {
                void navigate(`/editar/${id}`, { replace: true });
            }
        };
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (
                !huespedesInitialState?.current ||
                !reservaInitialState?.current
            ) {
                return;
            }

            const hayCambiosHuespedes = !dataHuespedes.every(
                (huesped, index) => {
                    const originalHuesped =
                        huespedesInitialState.current[index];
                    if (!originalHuesped) return false; // si no hay original, asumimos sin cambios

                    // Aquí aseguramos que pasamos objetos
                    return objectsAreEqual(
                        huesped,
                        parseToStringRecord(Object.entries(originalHuesped))
                    );
                }
            );

            const hayCambiosReserva = !objectsAreEqual(
                dataReserva,
                parseToStringRecord(Object.entries(reservaInitialState.current))
            );

            if (hayCambiosHuespedes || hayCambiosReserva) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        handleFormIntegrity();

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [
        dataHuespedes,
        dataReserva,
        fullCreationMode,
        id,
        location.pathname,
        navigate,
    ]);

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
                console.log('hola');
                // guarda el estado inicial de la reserva
                reservaInitialState.current = cleanObject(reservaRes.value);
            } else {
                console.error('Error en getReservaById:', reservaRes.reason);
                const errorMessage = `La reserva no existe o ha sido eliminada.`;
                setError((prev) => [
                    ...(prev?.filter((subPrev) => subPrev !== errorMessage) ??
                        []),
                    errorMessage,
                ]);
            }

            if (huespedesRes.status === 'fulfilled') {
                setDataHuespedes(
                    huespedesRes.value.map((huesped: Huesped) =>
                        parseToStringRecord(Object.entries(huesped))
                    )
                );
                // guarda el estado inicial de los huespedes
                huespedesInitialState.current = huespedesRes.value.map(
                    (huesped) => cleanObject(huesped)
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
            <h2 className="font-termina mb-4 text-center text-4xl font-semibold text-gray-800 underline">
                Editar Reserva
            </h2>
            <p className="font-termina mb-4 text-center text-gray-600">
                Completa los siguientes pasos para editar la reserva.
            </p>
            {error ? (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                    {error.map((err) => (
                        <p key={err} className="mb-2">
                            {err}
                        </p>
                    ))}
                </div>
            ) : (
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
                        fullCreationMode,
                        setFullCreationMode,
                        id,
                    }}
                />
            )}
        </div>
    );
};

export default ReservasEditar;
