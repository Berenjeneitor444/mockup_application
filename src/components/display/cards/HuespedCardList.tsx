import { Link } from 'react-router-dom';
import HuespedResumen from '../../../types/HuespedResumen';
import HuespedCard from './HuespedCard';

interface HuespedCardListProps {
    huespedesResumen: HuespedResumen[];
    message: string;
    navModeOn: boolean;
    setDataHuespedes?: React.Dispatch<
        React.SetStateAction<Record<string, string>[]>
    >;
    handleHuespedOnClick?: (IDHuesped: string) => void;
    idDelHuespedSeleccionado?: string;
}

export default function HuespedCardList({
    huespedesResumen,
    message,
    navModeOn,
    setDataHuespedes,
    handleHuespedOnClick,
    idDelHuespedSeleccionado,
}: HuespedCardListProps) {
    const handleOnDelete = (IDHuesped: string) => {
        if (setDataHuespedes) {
            setDataHuespedes((prev) =>
                prev.filter((huesped) => huesped.IDHuesped !== IDHuesped)
            );
        }
    };
    const selectedHuespedClass = `border-secondary border-5 border-solid rounded-lg bg-secondary/10 hover:bg-secondary/20`;
    return (
        <div className="flex flex-col space-y-4">
            {huespedesResumen.length === 0 ? (
                <div className="py-4 text-center text-gray-500">{message}</div>
            ) : (
                huespedesResumen.map((huespedResumen: HuespedResumen) => {
                    const card = (
                        <HuespedCard
                            huespedResumen={huespedResumen}
                            onDelete={
                                setDataHuespedes ? handleOnDelete : undefined
                            }
                            edit={navModeOn}
                            // si navModeOn es true, se muestra el botón de editar
                        />
                    );

                    return navModeOn ? (
                        <Link
                            key={huespedResumen.IDHuesped}
                            to={`/listar/reserva/${huespedResumen.reservationNumber}/huesped/${huespedResumen.IDHuesped}`}
                        >
                            {card}
                        </Link>
                    ) : (
                        <div
                            key={huespedResumen.IDHuesped}
                            className="flex-1 items-center justify-between"
                        >
                            {handleHuespedOnClick ? (
                                <div
                                    // ESTO ES LO QUE HACE QUE AL HACERLE CLICK EDITES EL REGISTRO
                                    onClick={() =>
                                        handleHuespedOnClick(
                                            huespedResumen.IDHuesped
                                        )
                                    }
                                    // si el ID del huesped es el seleccionado, se le aplica un estilo especial
                                    className={
                                        huespedResumen.IDHuesped ===
                                        idDelHuespedSeleccionado
                                            ? selectedHuespedClass
                                            : ''
                                    }
                                >
                                    {card}
                                </div>
                            ) : (
                                <div>{card}</div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}
