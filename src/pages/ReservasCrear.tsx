import { useEffect, useState } from 'react';
import Huesped, { huespedVacio } from '../types/Huesped';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    parseToHuesped,
    parseToReserva,
    recordsAreEqual,
    ReferentialIntegrityBuilder,
} from '../utils/EntityUtils';
import Reserva, { reservaVacia } from '../types/Reserva';
import { crearRegistros, reservaExiste } from '../services/HTTPOperations';
import { ToastContainer, toast } from 'react-toastify';
import toastMaker from '../utils/ToastUtils';
const ReservasCrear = () => {
    // para guardar los huespedes ya parseados
    const [dataHuespedes, setDataHuespedes] = useState<
        Record<string, string>[]
    >([]);
    // para guardar los datos introducidos en el formulario
    const [dataHuesped, setDataHuesped] =
        useState<Record<string, string>>(huespedVacio);
    // para guardar los datos introducidos en el formulario
    const [dataReserva, setDataReserva] =
        useState<Record<string, string>>(reservaVacia);

    const navigate = useNavigate();
    const location = useLocation();

    const validaciones = () => {
        if (dataHuespedes.length == 0) {
            throw new Error('Debe añadir al menos un huesped');
        }
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
        const huespedes: Huesped[] = dataHuespedes.map((huesped) =>
            parseToHuesped(huesped)
        );
        console.log(reserva);
        console.log(huespedes);
        // ajusta los campos en huesped que dependen de reserva
        ReferentialIntegrityBuilder(reserva, huespedes);

        crearRegistros(reserva, huespedes)
            .then((res) => {
                toastMaker(false, res);
                // reset
                setDataHuespedes([]);
                setDataHuesped(huespedVacio);
                setDataReserva(reservaVacia);
            })
            .catch((err: Error) => toastMaker(true, err.message));
    };

    // redirige al principio del formulario si no tienes los datos de reserva
    useEffect(() => {
        const handleFormIntegrity = () => {
            if (
                location.pathname !== '/crear/reserva' &&
                recordsAreEqual(dataReserva, reservaVacia)
            ) {
                void navigate('reserva', { replace: true });
            }
        };
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
        handleFormIntegrity();
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dataReserva, dataHuespedes.length, location, navigate]);
    // funciones para manejar los formularios hijos:

    // reservas

    const handleReservaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const exists = await reservaExiste(dataReserva.ReservationNumber);
        if (exists) {
            throw new Error('La reserva ya existe');
        } else {
            void navigate('/crear/huespedes');
        }
    };

    // Es para editar o no
    const forEdit: boolean = false;

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
            <h2 className="font-termina mb-4 text-center text-4xl font-semibold text-gray-800">
                Crear Reserva
            </h2>
            <p className="font-termina mb-4 text-center text-gray-600">
                Completa los siguientes pasos para crear una nueva reserva.
            </p>

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
                    },
                    handleBigSubmit,
                    forEdit,
                }}
            />
        </div>
    );
};

export default ReservasCrear;
