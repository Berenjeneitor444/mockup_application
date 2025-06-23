import { Link } from 'react-router-dom';
import { ReservaResumen } from '../../../types/ReservaResumen';
import ReservaCard from './ReservaCard';

interface ResumenCardListProps {
    reservasResumen: ReservaResumen[];
    message: string;
    navModeOn: boolean;
}

export default function ReservaCardList({
    reservasResumen,
    message,
    navModeOn,
}: ResumenCardListProps) {
    const columnas =
        reservasResumen.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1';
    return (
        <div className={`grid grid-cols-1 gap-4 ${columnas}`}>
            {reservasResumen.length === 0 ? (
                <div className="col-span-2 py-4 text-center text-gray-500">
                    {message}
                </div>
            ) : (
                reservasResumen.map((reservaResumen: ReservaResumen) => {
                    const card = (
                        <ReservaCard
                            reservaResumen={reservaResumen}
                            edit={navModeOn}
                        />
                    );

                    return navModeOn ? (
                        <Link
                            key={reservaResumen.ReservationNumber}
                            to={`/listar/reserva/${reservaResumen.hotel}/${reservaResumen.ReservationNumber}`}
                        >
                            {card}
                        </Link>
                    ) : (
                        <div key={reservaResumen.ReservationNumber}>{card}</div>
                    );
                })
            )}
        </div>
    );
}
