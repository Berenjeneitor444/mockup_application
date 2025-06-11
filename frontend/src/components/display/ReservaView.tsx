import { Link } from 'react-router-dom';
import Reserva from '../../types/Reserva';
import { dateParser, timeFormatter } from '../../utils/DateUtils';
import ViewField from './ViewField';

interface ReservaViewProps {
    reserva: Reserva;
}

const ReservaView = ({ reserva }: ReservaViewProps) => {
    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-secondary mb-6 border-b pb-2 text-2xl font-bold">
                Reserva {reserva.ReservationNumber}
            </h2>

            <div className="grid grid-cols-1 gap-4 space-y-2 sm:grid-cols-3 md:grid-cols-4">
                <ViewField label="Hotel" value={reserva.hotel} />
                <ViewField
                    label="Número de Reserva"
                    value={reserva.ReservationNumber}
                />
                <ViewField
                    label="Check-Out Realizado"
                    value={reserva.checkoutRealized}
                />
                <ViewField label="Check-In" value={reserva.CheckIn === 'X'} />
                <ViewField label="Localizador" value={reserva.Localizador} />
                <ViewField label="Hotel Factura" value={reserva.HotelFactura} />
                <ViewField label="Bono" value={reserva.Bono} />
                <ViewField label="Estado" value={reserva.Estado} />
                <ViewField label="Habitación" value={reserva.Habitacion} />
                <ViewField
                    label="Descripción TH"
                    value={reserva.THDescripcion}
                />
                <ViewField label="Uso TH" value={reserva.THUso} />
                <ViewField label="Sección" value={reserva.Seccion} />
                <ViewField label="Tarifa" value={reserva.Tarifa} />

                <ViewField label="Adultos" value={reserva.AD} />
                <ViewField label="Niños" value={reserva.NI} />
                <ViewField label="Junior" value={reserva.JR} />
                <ViewField label="Cuna" value={reserva.CU} />
                <ViewField
                    label="Pre Check-In"
                    value={reserva.PreCheckIn === 'X'}
                />
                <ViewField
                    label="Fecha Entrada"
                    value={
                        reserva.FechaEntrada
                            ? dateParser(reserva.FechaEntrada)
                            : null
                    }
                />
                <ViewField
                    label="Fecha Salida"
                    value={
                        reserva.FechaSalida
                            ? dateParser(reserva.FechaSalida)
                            : null
                    }
                />
                <ViewField label="Motivo Viaje" value={reserva.MotivoViaje} />
                <ViewField
                    label="Hora Llegada"
                    value={
                        reserva.LlegadaHora
                            ? timeFormatter(reserva.LlegadaHora, false)
                            : 'N/A'
                    }
                />
                <ViewField label="TH Factura" value={reserva.THFactura} />
                <ViewField
                    label="Bienvenida"
                    value={reserva.Bienvenida === 'X'}
                />
                <ViewField
                    label="Fecha Bienvenida"
                    value={
                        reserva.FechaBienv
                            ? dateParser(reserva.FechaBienv)
                            : null
                    }
                />
                <ViewField
                    label="Hora Bienvenida"
                    value={
                        reserva.HoraBienv
                            ? timeFormatter(reserva.HoraBienv, false)
                            : 'N/A'
                    }
                />
                <div className="col-span-full flex w-full">
                    <Link
                        to={`/editar/${reserva.ReservationNumber}`}
                        className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus w-full rounded-md px-6 py-3 text-center text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        Editar Registros
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReservaView;
