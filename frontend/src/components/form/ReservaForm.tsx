import CampoForm from './CampoForm';
import SeccionForm from './SeccionForm';

import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import toastMaker from '../../utils/ToastUtils';

export default function ReservaForm() {
    // recupera el estado dataReserva desde el padre, para crearlo aqui y poder acceder desde el padre
    interface OutletContext {
        datosReserva: {
            dataReserva: Record<string, string>;
            setDataReserva: React.Dispatch<
                React.SetStateAction<Record<string, string>>
            >;
            handleReservaSubmit: (
                e: React.FormEvent<HTMLFormElement>
            ) => Promise<void>;
        };
        forEdit: boolean;
        fullCreationMode: boolean;
        handleBigSubmit: () => void;
    }

    const context = useOutletContext<OutletContext>();
    const {
        datosReserva: { dataReserva, setDataReserva, handleReservaSubmit },
        forEdit,
        fullCreationMode,
        handleBigSubmit,
    } = context;

    const [reservaErrors, setReservaErrors] = useState<string[]>([]);

    const handleReservaInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const validateMap = {
            ReservationNumber: {
                pattern: /^\d+$/,
                message: 'El número de reserva debe ser un número',
            },
            Estado: {
                pattern: /^\d+$|^$/,
                message: 'El estado debe ser un número o estar vacío',
            },
            // seguir expandiendo a necesidad
        };

        const validateInput = (
            inputField: HTMLInputElement | HTMLSelectElement
        ) => {
            console.log(inputField.name, inputField.value);
            // validaciones personalizadas
            if (inputField.name in validateMap) {
                if (
                    !validateMap[
                        inputField.name as keyof typeof validateMap
                    ].pattern.test(inputField.value)
                ) {
                    inputField.setCustomValidity(
                        validateMap[inputField.name as keyof typeof validateMap]
                            .message
                    );
                    setReservaErrors((prev) => [...prev, inputField.name]);
                } else {
                    inputField.setCustomValidity('');
                    setReservaErrors((prev) =>
                        prev.filter((error) => error !== inputField.name)
                    );
                }
            }
            // Para ver errores si los hay
            inputField.reportValidity();
        };
        validateInput(e.currentTarget);
        const { name, value } = e.target;
        // si es checkbox y se desmarca se elimina de la lista
        if (e.target.type === 'checkbox' && !e.target.checked)
            setDataReserva((prev) => {
                const newState = { ...prev };
                delete newState[name];
                return newState;
            });
        else {
            setDataReserva((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // obtener referencia form
    const formRef = useRef<HTMLFormElement>(null);

    // mediante useEffect, cada vez que se renderice esta pagina se ejecutara lo de dentro
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (formRef.current) {
                setFormValid(formRef.current.checkValidity());
            }
        }, 0);
        return () => clearTimeout(timeout);
    }, [dataReserva, reservaErrors]);

    return (
        <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="bg-secondary px-6 py-4 text-white">
                    <h2 className="text-2xl font-bold">
                        Formulario de Reserva
                    </h2>
                </div>

                <form
                    className="p-6"
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (fullCreationMode) {
                            void handleReservaSubmit(e).catch((e: Error) =>
                                toastMaker(true, e.message)
                            );
                        } else {
                            handleBigSubmit();
                        }
                    }}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Datos básicos */}
                        <SeccionForm titulo="Datos Básicos">
                            <CampoForm label="Hotel">
                                <select
                                    name="hotel"
                                    required
                                    value={dataReserva?.hotel ?? ''}
                                    onChange={handleReservaInputChange}
                                >
                                    <option value="M1">M1</option>
                                    <option value="M2">M2</option>
                                    <option value="M3">M3</option>
                                    <option value="M4">M4</option>
                                </select>
                            </CampoForm>

                            <CampoForm label="Numero Reserva">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="text"
                                    name="ReservationNumber"
                                    maxLength={10}
                                    minLength={10}
                                    readOnly={forEdit}
                                    required
                                    value={dataReserva?.ReservationNumber ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Localizador">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="text"
                                    name="Localizador"
                                    value={dataReserva?.Localizador ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Bono">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="text"
                                    name="Bono"
                                    value={dataReserva?.Bono ?? ''}
                                />
                            </CampoForm>
                        </SeccionForm>

                        {/* Estado de la Reserva */}
                        <SeccionForm titulo="Estado de la Reserva">
                            <CampoForm label="Estado de la Reserva">
                                <input
                                    type="text"
                                    onChange={handleReservaInputChange}
                                    name="Estado"
                                    value={dataReserva?.Estado ?? ''}
                                />
                            </CampoForm>
                            <CampoForm label="¿Check-out Hecho?">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleReservaInputChange}
                                        type="checkbox"
                                        name="checkoutRealized"
                                        value="true"
                                        checked={
                                            dataReserva?.checkoutRealized ===
                                            'true'
                                                ? true
                                                : false
                                        }
                                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                    />

                                    <span className="ml-2 text-gray-600">
                                        Sí
                                    </span>
                                </div>
                            </CampoForm>

                            <CampoForm label="¿Check-in?">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleReservaInputChange}
                                        type="checkbox"
                                        name="CheckIn"
                                        value="X"
                                        checked={
                                            dataReserva?.CheckIn ? true : false
                                        }
                                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600">
                                        Sí
                                    </span>
                                </div>
                            </CampoForm>

                            <CampoForm label="¿Pre-check-in?">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleReservaInputChange}
                                        type="checkbox"
                                        name="PreCheckIn"
                                        value="X"
                                        checked={
                                            dataReserva?.PreCheckIn
                                                ? true
                                                : false
                                        }
                                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600">
                                        Sí
                                    </span>
                                </div>
                            </CampoForm>
                        </SeccionForm>

                        {/* Detalles de habitación */}
                        <SeccionForm titulo="Detalles de Habitación">
                            <CampoForm label="Habitacion">
                                <input
                                    type="text"
                                    onChange={handleReservaInputChange}
                                    name="Habitacion"
                                    value={dataReserva?.Habitacion ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="THDescripcion">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="THDescripcion"
                                    value={dataReserva?.THDescripcion ?? ''}
                                >
                                    <option value="">
                                        Seleccione THDescripcion
                                    </option>
                                    <option value="JUNIOR SUITE">
                                        Junior Suite
                                    </option>
                                    <option value="SENIOR SUITE">
                                        Senior Suite
                                    </option>
                                </select>
                            </CampoForm>

                            <CampoForm label="THUso">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="THUso"
                                    value={dataReserva?.THUso ?? ''}
                                >
                                    <option value="">Seleccione THUso</option>
                                    <option value="JS">Junior Suite</option>
                                    <option value="SS">Senior Suite</option>
                                </select>
                            </CampoForm>

                            <CampoForm label="Sección">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="Seccion"
                                    value={dataReserva?.Seccion ?? ''}
                                >
                                    <option value="">Seleccione Sección</option>
                                    <option value="CLUB">Club</option>
                                    <option value="FAMILIAR">Familiar</option>
                                </select>
                            </CampoForm>

                            <CampoForm label="Tarifa">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="Tarifa"
                                    value={dataReserva?.Tarifa ?? ''}
                                >
                                    <option value="">Seleccione Tarifa</option>
                                    <option value="O_USA_BAR">USA</option>
                                    <option value="O_CA_BAR">Canada</option>
                                    <option value="O_SP_BAR">España</option>
                                </select>
                            </CampoForm>

                            <CampoForm label="THFactura">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="THFactura"
                                    value={dataReserva?.THFactura ?? ''}
                                >
                                    <option value="">
                                        Seleccione THFactura
                                    </option>
                                    <option value="AISTAD">AISTAD</option>
                                </select>
                            </CampoForm>
                        </SeccionForm>

                        {/* Información de huéspedes */}

                        <SeccionForm titulo="Información de huéspedes">
                            <CampoForm label="Adultos">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="number"
                                    name="AD"
                                    min="0"
                                    max="40"
                                    readOnly={forEdit}
                                    value={dataReserva?.AD ?? 0}
                                />
                            </CampoForm>

                            <CampoForm label="Niños">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="number"
                                    name="NI"
                                    min="0"
                                    max="40"
                                    readOnly={forEdit}
                                    value={dataReserva?.NI ?? 0}
                                />
                            </CampoForm>

                            <CampoForm label="Jóvenes">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="number"
                                    name="JR"
                                    min="0"
                                    max="40"
                                    readOnly={forEdit}
                                    value={dataReserva?.JR ?? 0}
                                />
                            </CampoForm>

                            <CampoForm label="Infantes">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="number"
                                    name="CU"
                                    min="0"
                                    max="40"
                                    readOnly={forEdit}
                                    value={dataReserva?.CU ?? 0}
                                />
                            </CampoForm>
                        </SeccionForm>

                        {/* Fechas */}

                        <SeccionForm titulo="Fechas">
                            <CampoForm label="Fecha Entrada">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="date"
                                    name="FechaEntrada"
                                    value={dataReserva?.FechaEntrada ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Fecha Salida">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="date"
                                    name="FechaSalida"
                                    value={dataReserva?.FechaSalida ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Llegada Hora">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="time"
                                    name="LlegadaHora"
                                    value={dataReserva?.LlegadaHora ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Motivo Viaje">
                                <select
                                    onChange={handleReservaInputChange}
                                    name="MotivoViaje"
                                    value={dataReserva?.MotivoViaje ?? ''}
                                >
                                    <option value="">Seleccione Motivo</option>
                                    <option value="LUNADEMIEL">
                                        Luna de miel
                                    </option>
                                    <option value="ANIVERSARI">
                                        Aniversario
                                    </option>
                                    <option value="VACACIONES">
                                        Vacaciones
                                    </option>
                                    <option value="CUMPLEAÑOS">
                                        Cumpleaños
                                    </option>
                                    <option value="OTROS">Otro</option>
                                </select>
                            </CampoForm>
                        </SeccionForm>

                        {/* Bienvenida */}

                        <SeccionForm titulo="Bienvenida">
                            <CampoForm label="¿Bienvenida?">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleReservaInputChange}
                                        type="checkbox"
                                        name="Bienvenida"
                                        value="X"
                                        checked={
                                            dataReserva?.Bienvenida
                                                ? true
                                                : false
                                        }
                                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600">
                                        Sí
                                    </span>
                                </div>
                            </CampoForm>

                            <CampoForm label="Fecha Bienvenida">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="date"
                                    name="FechaBienv"
                                    value={dataReserva?.FechaBienv ?? ''}
                                />
                            </CampoForm>

                            <CampoForm label="Hora Bienvenida">
                                <input
                                    onChange={handleReservaInputChange}
                                    type="time"
                                    name="HoraBienv"
                                    value={dataReserva?.HoraBienv ?? ''}
                                />
                            </CampoForm>
                        </SeccionForm>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <Link
                            className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            to="../"
                        >
                            Cambiar modo
                        </Link>
                        <button
                            type="submit"
                            disabled={reservaErrors?.length > 0 || !formValid}
                            className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {fullCreationMode
                                ? 'Siguiente'
                                : forEdit
                                  ? 'Editar Reserva'
                                  : 'Crear Reserva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
