import Huesped from '../../types/Huesped';
import ViewField from './ViewField';
import { dateParser } from '../../utils/DateUtils';
import { Link } from 'react-router-dom';

interface HuespedViewProps {
    huesped: Huesped;
}

const HuespedView = ({ huesped }: HuespedViewProps) => {
    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-secondary mb-6 border-b pb-2 text-2xl font-bold">
                Huesped {huesped.IDHuesped}
            </h2>

            <div className="grid grid-cols-1 gap-4 space-y-2 sm:grid-cols-3 md:grid-cols-4">
                <ViewField label="Hotel" value={huesped.hotel} />

                <ViewField
                    label="Numero de reserva"
                    value={huesped.reservationNumber}
                />
                <ViewField label="Hotel Factura" value={huesped.HotelFactura} />
                <ViewField
                    label="Numero de reserva"
                    value={huesped.NumReserva}
                />
                <ViewField
                    label="Número de huesped"
                    value={huesped.NumeroCliente}
                />
                <ViewField
                    label="Tipo de Persona"
                    value={huesped.TipoPersona}
                />
                <ViewField label="Nombre de Pila" value={huesped.Nombre_Pila} />
                <ViewField label="Apellidos" value={huesped.Nombre} />
                <ViewField label="Email" value={huesped.Email} />
                <ViewField
                    label="Fecha de Nacimiento"
                    value={dateParser(huesped.FechaNacimiento)}
                />
                <ViewField
                    label="Pais de Nacimiento"
                    value={huesped.PaisNacimiento}
                />

                <ViewField
                    label="Tipo de Documento"
                    value={huesped.TipoDocumento}
                />
                <ViewField
                    label="Fecha de expedición"
                    value={dateParser(huesped.FechaExpedicion)}
                />
                <ViewField
                    label="Fecha de caducidad"
                    value={dateParser(huesped.FechaCaducidad)}
                />
                <ViewField label="Edad" value={huesped.Edad} />
                <ViewField
                    label="ID de documento"
                    value={huesped.IDDocumento}
                />
                <ViewField
                    label="Fecha Entrada"
                    value={dateParser(huesped.FechaEntrada)}
                />
                <ViewField label="Firma" value={huesped.Firma === 'X'} />

                <ViewField
                    label="Fecha Salida"
                    value={dateParser(huesped.FechaSalida)}
                />
                <ViewField
                    label="Tipo de Cliente"
                    value={huesped.TipoCliente}
                />

                <ViewField
                    label="Sexo"
                    value={
                        huesped.Sexo === '1'
                            ? 'Masculino'
                            : huesped.Sexo === '2'
                              ? 'Femenino'
                              : 'No especificado'
                    }
                />
                <ViewField
                    label="Acepta Información"
                    value={huesped.AceptaInfo === 'X'}
                />
                <ViewField
                    label="¿Repetidor?"
                    value={huesped.Repetidor === 'X'}
                />
                <ViewField label="VIP" value={huesped.Vip} />
                <ViewField
                    label="Dirección"
                    value={huesped.DatosComunicacion?.Direccion}
                />
                <ViewField
                    label="Código Postal"
                    value={huesped.DatosComunicacion?.CodigoPostal}
                />
                <ViewField
                    label="Población"
                    value={huesped.DatosComunicacion?.Poblacion}
                />
                <ViewField
                    label="Provincia"
                    value={huesped.DatosComunicacion?.Provincia}
                />
                <ViewField
                    label="Comunidad Autónoma"
                    value={huesped.DatosComunicacion?.ComunidadAutonoma}
                />
                <ViewField
                    label="País"
                    value={huesped.DatosComunicacion?.Pais}
                />
                <ViewField
                    label="Apartado de Correos"
                    value={huesped.DatosComunicacion?.ApartadoCorreos}
                />
                <ViewField
                    label="Teléfono"
                    value={huesped.DatosComunicacion?.Telefono}
                />
                <ViewField
                    label="Teléfono Móvil"
                    value={huesped.DatosComunicacion?.TelefonoMovil}
                />
                <ViewField
                    label="Fax"
                    value={huesped.DatosComunicacion?.FaxNumber}
                />
                <ViewField
                    label="Email"
                    value={huesped.DatosComunicacion?.EMail}
                />

                <div className="col-span-full row-span-2 w-full">
                    <ViewField
                        label="Descripción"
                        value={huesped.DatosComunicacion?.Descripcion}
                    />
                </div>
                <div className="col-span-full flex w-full">
                    <Link
                        to={`/editar/${huesped.reservationNumber}`}
                        className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus w-full rounded-md px-6 py-3 text-center text-lg font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        Editar Registros
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HuespedView;
