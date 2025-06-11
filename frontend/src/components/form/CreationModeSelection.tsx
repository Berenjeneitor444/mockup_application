import { useNavigate, useOutletContext } from 'react-router-dom';

export default function CreationModeSelection() {
    interface OutletContext {
        setFullCreationMode: React.Dispatch<React.SetStateAction<boolean>>;
        forEdit: boolean;
        id: string;
        datosHuespedes: { dataHuespedes: Record<string, string>[] };
    }
    const context = useOutletContext<OutletContext>();

    const {
        setFullCreationMode,
        forEdit,
        id,
        datosHuespedes: { dataHuespedes },
    } = context;
    const navigator = useNavigate();

    const changeCreationMode = (bool: boolean) => {
        console.log(dataHuespedes);
        setFullCreationMode(bool);
        void navigator(forEdit ? `/editar/${id}/reserva` : '/crear/reserva');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-6 flex flex-1 flex-col items-center justify-center space-y-12">
                <h2 className="font-termina text-center text-xl font-medium text-gray-800">
                    {forEdit
                        ? 'Elije el modo de modificacion'
                        : 'Elije el modo de creacion'}
                </h2>
                <button
                    className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus w-xl rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    onClick={() => changeCreationMode(false)}
                >
                    {forEdit ? 'Editar Reserva' : 'Crear Reserva'}
                </button>
                <div className="flex w-full max-w-xs items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button
                    className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus w-xl rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => changeCreationMode(true)}
                    title={
                        dataHuespedes.length === 0 && forEdit
                            ? 'Esta reserva no tiene huespedes'
                            : undefined
                    }
                    disabled={dataHuespedes.length === 0 && forEdit}
                >
                    {forEdit
                        ? 'Editar Reserva y Huéspedes'
                        : 'Crear Reserva y Huéspedes'}
                </button>
            </div>
        </div>
    );
}
