import HuespedCardList from '../display/cards/HuespedCardList';
import CampoForm from './CampoForm';
import HuespedResumen, { getHuespedResumen } from '../../types/HuespedResumen';
import SeccionForm from './SeccionForm';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { parseToHuesped, parseToStringRecord } from '../../utils/EntityUtils';
import toastMaker from '../../utils/ToastUtils';
import { huespedExiste } from '../../services/HTTPOperations';

export default function HuespedForm() {
    const handleHuespedOnClick = (IDHuesped: string) => {
        if (!forEdit) return;

        if (!formValid && huespedEditedIndex !== null) {
            formRef.current?.reportValidity();
            return;
        }
        if (IDHuesped) {
            const huesped = dataHuespedes.find(
                (huesped) => huesped.IDHuesped === IDHuesped
            );
            if (huesped) {
                setHuespedEditedIndex(IDHuesped);
            }
        }
    };
    // recupera el estado de los huespedes desde el padre, para crearlo aqui y poder acceder desde el padre
    interface OutletContext {
        datosHuespedes: {
            dataHuespedes: Record<string, string>[];
            setDataHuespedes: React.Dispatch<
                React.SetStateAction<Record<string, string>[]>
            >;
            dataHuesped: Record<string, string>;
            setDataHuesped: React.Dispatch<
                React.SetStateAction<Record<string, string>>
            >;
            huespedEditedIndex: string;
            setHuespedEditedIndex: React.Dispatch<
                React.SetStateAction<string | null>
            >;
        };
        handleBigSubmit: () => void;
        forEdit: boolean;
    }

    const context = useOutletContext<OutletContext>();

    const {
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
    } = context;

    // huespedes
    const [huespedErrors, setHuespedErrors] = useState<string[]>([]);
    const [formValid, setFormValid] = useState<boolean>(false);
    const handleHuespedInputChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
        ) => {
            const validateMap = {
                IDHuesped: {
                    pattern: /^\d+$/,
                    message: 'El ID debe ser un número',
                },
                'DatosComunicacion.FaxNumber': {
                    pattern: /^\+?\d+$|^$/,
                    message: 'El Fax debe ser un número',
                },
                'DatosComunicacion.Telefono': {
                    pattern: /^\+?\d+$|^$/,
                    message: 'El Teléfono debe ser un número',
                },
                'DatosComunicacion.TelefonoMovil': {
                    pattern: /^\+?\d+$|^$/,
                    message: 'El Teléfono móvil debe ser un número',
                },
                // seguir expandiendo a necesidad
            };
            const validateInput = (
                inputField:
                    | HTMLInputElement
                    | HTMLSelectElement
                    | HTMLTextAreaElement
            ) => {
                // validaciones personalizadas
                if (inputField.name in validateMap) {
                    if (
                        !validateMap[
                            inputField.name as keyof typeof validateMap
                        ].pattern.test(inputField.value)
                    ) {
                        inputField.setCustomValidity(
                            validateMap[
                                inputField.name as keyof typeof validateMap
                            ].message
                        );
                        setHuespedErrors((prev) => [...prev, inputField.name]);
                    } else {
                        inputField.setCustomValidity('');
                        setHuespedErrors((prev) =>
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
            if (
                e.target instanceof HTMLInputElement &&
                e.target.type === 'checkbox' &&
                !e.target.checked
            ) {
                setDataHuesped((prev) => {
                    const newState = { ...prev };
                    delete newState[name];
                    return newState;
                });
                // para actualizar la lista de huespedes en el momento a la vez
                if (forEdit)
                    setDataHuespedes((prev) => {
                        return prev.map((huesped) => {
                            if (huesped.IDHuesped === dataHuesped.IDHuesped) {
                                const newHuesped = { ...huesped };
                                delete newHuesped[name];
                                return newHuesped;
                            }
                            return huesped;
                        });
                    });
            } else {
                setDataHuesped((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                if (forEdit) {
                    setDataHuespedes((prev) =>
                        prev.map((huesped) => {
                            if (huesped.IDHuesped === dataHuesped.IDHuesped) {
                                return {
                                    ...huesped,
                                    [name]: value,
                                };
                            }
                            return huesped;
                        })
                    );
                }
            }
        },
        [dataHuesped.IDHuesped, forEdit, setDataHuesped, setDataHuespedes]
    );

    // agrega un huesped a la lista
    const handleHuespedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const validateIntegrity = async () => {
            const exists = await huespedExiste(dataHuesped.IDHuesped);
            if (exists) {
                throw new Error('El huesped ya existe');
            } else {
                return;
            }
        };
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nuevoHuesped = parseToStringRecord(formData);

        // comprueba que no exista un huesped con ese id antes
        await validateIntegrity();
        setDataHuespedes((prevHuespedes) => [
            ...prevHuespedes.filter(
                // para sustituir si uno con el mismo ID ya existe
                (huesped) => huesped.IDHuesped !== nuevoHuesped.IDHuesped
            ),
            nuevoHuesped,
        ]);
        console.log(dataHuespedes);
        setDataHuesped({});
        formRef.current?.reset();
    };
    const formRef = useRef<HTMLFormElement>(null);

    const navigator = useNavigate();
    useEffect(() => {
        // Si se está editando un huesped, se carga en el formulario
        if (forEdit && huespedEditedIndex !== null) {
            const huesped = dataHuespedes.find(
                (huesped) => huesped.IDHuesped === huespedEditedIndex
            );
            if (huesped) {
                setDataHuesped(huesped);
            }
        }
    }, [dataHuespedes, forEdit, huespedEditedIndex, setDataHuesped]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (formRef.current) {
                setFormValid(formRef.current.checkValidity());
            }
        }, 0);
        return () => clearTimeout(timeout);
    }, [dataHuesped, huespedErrors]);

    function Botones() {
        return (
            <div>
                <div className="mt-8 flex w-full justify-between">
                    <button
                        type="button"
                        onClick={() => void navigator('../reserva')}
                        className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        Atrás
                    </button>
                    {!forEdit ? (
                        <button
                            type="submit"
                            disabled={huespedErrors.length > 0 || !formValid}
                            className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Añadir Huésped
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleBigSubmit}
                            hidden={!!huespedEditedIndex && !formValid}
                            className={`bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus ${!forEdit ? 'w-full' : ''} rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                        >
                            Editar Registros
                        </button>
                    )}
                </div>
                {!forEdit && (
                    <div
                        className={`mt-8 flex ${!forEdit ? 'w-full' : ''} justify-end`}
                        hidden={
                            dataHuespedes.length === 0 ||
                            (forEdit && !formValid)
                        }
                    >
                        <button
                            type="button"
                            onClick={handleBigSubmit}
                            className={`bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus ${!forEdit ? 'w-full' : ''} rounded-md px-6 py-3 text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                        >
                            Crear Registros
                        </button>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-full px-4">
            {/* Contenedor flexbox principal */}
            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Formulario a la izquierda */}
                <div className="w-full lg:w-7/10">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                        <div className="bg-secondary px-8 py-5 text-white">
                            <h2 className="text-2xl font-bold">
                                Registro de Huésped
                            </h2>
                        </div>
                        {forEdit && huespedEditedIndex === null ? (
                            // Si estamos editando y no hay un huesped seleccionado, no mostramos nada
                            <div className="p-8">
                                <p className="flex h-screen items-center justify-center text-center text-gray-500">
                                    Selecciona algún huesped para editarlo
                                </p>
                                <Botones />
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    void handleHuespedSubmit(e).catch(
                                        (err: Error) => {
                                            console.log(err);
                                            toastMaker(true, err.message);
                                        }
                                    );
                                }}
                                className="p-8"
                                ref={formRef}
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Datos de comunicación */}
                                    <SeccionForm titulo="Datos de Comunicación">
                                        <CampoForm label="Dirección">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.Direccion"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.Direccion'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Código Postal">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.CodigoPostal"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.CodigoPostal'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Población">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.Poblacion"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.Poblacion'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Provincia">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.Provincia"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.Provincia'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Comunidad Autónoma">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.ComunidadAutonoma"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.ComunidadAutonoma'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="País">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.Pais"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.Pais'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Apartado de Correos">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.ApartadoCorreos"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.ApartadoCorreos'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Teléfono">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="tel"
                                                name="DatosComunicacion.Telefono"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.Telefono'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Teléfono Móvil">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="tel"
                                                name="DatosComunicacion.TelefonoMovil"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.TelefonoMovil'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Fax">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="DatosComunicacion.FaxNumber"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.FaxNumber'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Correo Electrónico">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="email"
                                                name="DatosComunicacion.EMail"
                                                value={
                                                    dataHuesped?.[
                                                        'DatosComunicacion.EMail'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>
                                        <CampoForm label="Descripción">
                                            <textarea
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                name="DatosComunicacion.Descripcion"
                                                value={
                                                    dataHuesped[
                                                        'DatosComunicacion.Descripcion'
                                                    ] ?? ''
                                                }
                                            />
                                        </CampoForm>
                                    </SeccionForm>
                                    {/* Datos personales */}
                                    <SeccionForm titulo="Datos Personales">
                                        <CampoForm label="Número Cliente">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="NumeroCliente"
                                                value={
                                                    dataHuesped?.NumeroCliente ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="ID Huesped">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="IDHuesped"
                                                maxLength={10}
                                                minLength={10}
                                                readOnly={forEdit}
                                                value={
                                                    dataHuesped?.IDHuesped ?? ''
                                                }
                                                required
                                            />
                                        </CampoForm>

                                        <CampoForm label="Tipo Persona">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="TipoPersona"
                                                value={
                                                    dataHuesped?.TipoPersona ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Nombre de Pila">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="Nombre_Pila"
                                                value={
                                                    dataHuesped?.Nombre_Pila ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Apellido">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="Nombre"
                                                value={
                                                    dataHuesped?.Nombre ?? ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Fecha de Nacimiento">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="date"
                                                name="FechaNacimiento"
                                                value={
                                                    dataHuesped?.FechaNacimiento ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="País de Nacimiento">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="PaisNacimiento"
                                                value={
                                                    dataHuesped?.PaisNacimiento ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>
                                    </SeccionForm>

                                    {/* Datos de documento */}
                                    <SeccionForm titulo="Datos de Documento">
                                        <CampoForm label="Tipo Documento">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="TipoDocumento"
                                                value={
                                                    dataHuesped?.TipoDocumento ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Fecha Expedición">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="date"
                                                name="FechaExpedicion"
                                                value={
                                                    dataHuesped?.FechaExpedicion ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Fecha Caducidad">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="date"
                                                name="FechaCaducidad"
                                                value={
                                                    dataHuesped?.FechaCaducidad ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Edad">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="number"
                                                name="Edad"
                                                min="0"
                                                max="120"
                                                value={dataHuesped?.Edad ?? ''}
                                            />
                                        </CampoForm>

                                        <CampoForm label="ID Documento">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                pattern="\d+"
                                                name="IDDocumento"
                                                value={
                                                    dataHuesped?.IDDocumento ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>
                                    </SeccionForm>

                                    {/* Información adicional */}
                                    <SeccionForm titulo="Información Adicional">
                                        <CampoForm label="Tipo Cliente">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="TipoCliente"
                                                value={
                                                    dataHuesped?.TipoCliente ??
                                                    ''
                                                }
                                            />
                                        </CampoForm>

                                        <CampoForm label="Sexo">
                                            <select
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                name="Sexo"
                                                value={dataHuesped?.Sexo ?? ''}
                                            >
                                                <option value="">
                                                    Seleccione Sexo
                                                </option>
                                                <option value="1">
                                                    Masculino
                                                </option>
                                                <option value="2">
                                                    Femenino
                                                </option>
                                            </select>
                                        </CampoForm>

                                        <CampoForm label="Acepta Info">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={
                                                        handleHuespedInputChange
                                                    }
                                                    type="checkbox"
                                                    name="AceptaInfo"
                                                    value="X"
                                                    checked={
                                                        dataHuesped?.AceptaInfo ===
                                                        'X'
                                                            ? true
                                                            : false
                                                    }
                                                    className="text-secondary focus:ring-secondary-focus h-4 w-4 rounded"
                                                />
                                                <span className="ml-2 text-gray-600">
                                                    Sí
                                                </span>
                                            </div>
                                        </CampoForm>

                                        <CampoForm label="Repetidor">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={
                                                        handleHuespedInputChange
                                                    }
                                                    type="checkbox"
                                                    name="Repetidor"
                                                    value="X"
                                                    checked={
                                                        dataHuesped?.Repetidor ===
                                                        'X'
                                                            ? true
                                                            : false
                                                    }
                                                    className="text-secondary focus:ring-secondary-focus h-4 w-4 rounded"
                                                />
                                                <span className="ml-2 text-gray-600">
                                                    Sí
                                                </span>
                                            </div>
                                        </CampoForm>

                                        <CampoForm label="VIP">
                                            <input
                                                onChange={
                                                    handleHuespedInputChange
                                                }
                                                type="text"
                                                name="Vip"
                                                value={dataHuesped?.Vip ?? ''}
                                            />
                                        </CampoForm>
                                    </SeccionForm>
                                </div>
                                <Botones />
                            </form>
                        )}
                    </div>
                </div>

                {/* Lista de huéspedes a la derecha */}
                <div className="w-full lg:w-4/10">
                    <div className="sticky top-4">
                        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                            <div className="bg-secondary px-8 py-5 text-white">
                                <h3 className="text-xl font-semibold">
                                    Huéspedes Registrados
                                </h3>
                            </div>
                            <div className="max-h-screen overflow-y-auto p-6">
                                <HuespedCardList
                                    huespedesResumen={dataHuespedes
                                        .map((huesped) =>
                                            getHuespedResumen(
                                                parseToHuesped(huesped)
                                            )
                                        )
                                        .filter(
                                            (r): r is HuespedResumen =>
                                                r !== null
                                        )}
                                    navModeOn={false}
                                    message="No hay huespedes registrados"
                                    handleHuespedOnClick={handleHuespedOnClick}
                                    setDataHuespedes={
                                        forEdit ? undefined : setDataHuespedes
                                    }
                                    idDelHuespedSeleccionado={
                                        huespedEditedIndex
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
