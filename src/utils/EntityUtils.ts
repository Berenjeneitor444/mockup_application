import Huesped from '../types/Huesped';
import Reserva from '../types/Reserva';
import ReservaFilter from '../types/ReservaFilter';
import { dateFormatter, dateParser, timeFormatter } from './DateUtils';

// Helper: añade sólo si value no es null ni undefined
function addIf<T, K extends keyof T>(
    obj: T,
    key: K,
    value: T[K] | null | undefined
) {
    if (value) {
        obj[key] = value;
    }
}
export function ReferentialIntegrityBuilder(
    reserva: Reserva,
    huespedes: Huesped[]
) {
    huespedes.forEach((huesped) => {
        if (reserva.FechaEntrada) huesped.FechaEntrada = reserva.FechaEntrada;
        if (reserva.FechaSalida) huesped.FechaSalida = reserva.FechaSalida;
        if (reserva.hotel) huesped.hotel = reserva.hotel;
        if (reserva.HotelFactura) huesped.HotelFactura = reserva.HotelFactura;
        if (reserva.ReservationNumber)
            huesped.reservationNumber = reserva.ReservationNumber;
        if (reserva.NumReserva) huesped.NumReserva = reserva.NumReserva;
    });
}
export function parseToHuesped(
    huespedData: Record<string, string | undefined>
): Huesped {
    // Construimos un Partial<Huesped> para ir añadiendo sólo lo necesario
    const result: Partial<Huesped> = {};

    addIf(result, 'hotel', huespedData['hotel']);
    addIf(result, 'HotelFactura', huespedData['hotel']);
    addIf(result, 'reservationNumber', huespedData['reservationNumber']);
    addIf(result, 'NumReserva', huespedData['reservationNumber']);
    addIf(result, 'NumeroCliente', huespedData['NumeroCliente']);
    addIf(result, 'IDHuesped', huespedData['IDHuesped']);
    addIf(result, 'TipoPersona', huespedData['TipoPersona']);
    addIf(result, 'Nombre_Pila', huespedData['Nombre_Pila']);
    addIf(result, 'Nombre', huespedData['Nombre']);
    addIf(result, 'Email', huespedData['DatosComunicacion.EMail']);
    if (huespedData['FechaNacimiento']) {
        addIf(
            result,
            'FechaNacimiento',
            dateFormatter(
                new Date(huespedData['FechaNacimiento']),
                'yyyyMMddhhmmss'
            )
        );
    }
    addIf(result, 'PaisNacimiento', huespedData['PaisNacimiento']);
    addIf(result, 'TipoDocumento', huespedData['TipoDocumento']);
    if (huespedData['FechaExpedicion']) {
        addIf(
            result,
            'FechaExpedicion',
            dateFormatter(
                new Date(huespedData['FechaExpedicion']),
                'yyyyMMddhhmmss'
            )
        );
    }
    if (huespedData['FechaCaducidad']) {
        addIf(
            result,
            'FechaCaducidad',
            dateFormatter(
                new Date(huespedData['FechaCaducidad']),
                'yyyyMMddhhmmss'
            )
        );
    }
    if (huespedData['Edad']) {
        addIf(result, 'Edad', huespedData['Edad'].padStart(3, '0'));
    }
    addIf(result, 'IDDocumento', huespedData['IDDocumento']);
    addIf(result, 'TipoCliente', huespedData['TipoCliente']);
    if (huespedData['Sexo']) {
        addIf(result, 'Sexo', huespedData['Sexo']);
    }
    addIf(result, 'AceptaInfo', huespedData['AceptaInfo']);
    addIf(result, 'Repetidor', huespedData['Repetidor']);
    addIf(result, 'Vip', huespedData['Vip']);
    if (huespedData['FechaEntrada']) {
        addIf(
            result,
            'FechaEntrada',
            dateFormatter(
                new Date(huespedData['FechaEntrada']),
                'yyyyMMddhhmmss'
            )
        );
    }
    if (huespedData['FechaSalida']) {
        addIf(
            result,
            'FechaSalida',
            dateFormatter(
                new Date(huespedData['FechaSalida']),
                'yyyyMMddhhmmss'
            )
        );
    }

    // DatosComunicacion por separado
    const datosCom: Partial<Huesped['DatosComunicacion']> = {};
    addIf(
        datosCom,
        'Descripcion',
        huespedData['DatosComunicacion.Descripcion']
    );
    addIf(datosCom, 'Direccion', huespedData['DatosComunicacion.Direccion']);
    addIf(
        datosCom,
        'CodigoPostal',
        huespedData['DatosComunicacion.CodigoPostal']
    );
    addIf(datosCom, 'Poblacion', huespedData['DatosComunicacion.Poblacion']);
    addIf(datosCom, 'Provincia', huespedData['DatosComunicacion.Provincia']);
    addIf(
        datosCom,
        'ComunidadAutonoma',
        huespedData['DatosComunicacion.ComunidadAutonoma']
    );
    addIf(datosCom, 'Pais', huespedData['DatosComunicacion.Pais']);
    addIf(
        datosCom,
        'ApartadoCorreos',
        huespedData['DatosComunicacion.ApartadoCorreos']
    );
    addIf(datosCom, 'Telefono', huespedData['DatosComunicacion.Telefono']);
    addIf(
        datosCom,
        'TelefonoMovil',
        huespedData['DatosComunicacion.TelefonoMovil']
    );
    addIf(datosCom, 'FaxNumber', huespedData['DatosComunicacion.FaxNumber']);
    addIf(datosCom, 'EMail', huespedData['DatosComunicacion.EMail']);

    if (Object.keys(datosCom).length > 0) {
        result.DatosComunicacion = datosCom as Huesped['DatosComunicacion'];
    }

    return result as Huesped;
}

// -------------------------------------------------------

export function parseToReserva(
    reservaData: Record<string, string | undefined>
): Reserva {
    const result: Partial<Reserva> = {};

    addIf(result, 'hotel', reservaData['hotel']);
    addIf(result, 'ReservationNumber', reservaData['ReservationNumber']);
    if (reservaData['checkoutRealized'] != null) {
        if (reservaData['checkoutRealized'] === 'true') {
            addIf(result, 'checkoutRealized', true);
        } else {
            addIf(result, 'checkoutRealized', false);
        }
    }
    addIf(result, 'CheckIn', reservaData['CheckIn']);
    addIf(result, 'Localizador', reservaData['Localizador']);
    addIf(result, 'HotelFactura', reservaData['hotel']);
    addIf(result, 'NumReserva', reservaData['ReservationNumber']);
    addIf(result, 'Bono', reservaData['Bono']);
    if (typeof reservaData['Estado'] === 'string') {
        addIf(result, 'Estado', parseInt(reservaData['Estado'], 10));
    }
    addIf(result, 'Habitacion', reservaData['Habitacion']);
    addIf(result, 'THDescripcion', reservaData['THDescripcion']);
    addIf(result, 'THUso', reservaData['THUso']);
    addIf(result, 'Seccion', reservaData['Seccion']);
    addIf(result, 'Tarifa', reservaData['Tarifa']);
    if (reservaData['AD']) {
        addIf(result, 'AD', parseInt(reservaData['AD'], 10));
    }

    if (reservaData['NI']) {
        addIf(result, 'NI', parseInt(reservaData['NI'], 10));
    }
    if (reservaData['JR']) {
        addIf(result, 'JR', parseInt(reservaData['JR'], 10));
    }
    if (reservaData['CU']) {
        addIf(result, 'CU', parseInt(reservaData['CU'], 10));
    }
    addIf(result, 'PreCheckIn', reservaData['PreCheckIn']);
    if (reservaData['FechaEntrada']) {
        addIf(
            result,
            'FechaEntrada',
            dateFormatter(
                new Date(reservaData['FechaEntrada']),
                'yyyyMMddhhmmss'
            )
        );
    }
    if (reservaData['FechaSalida']) {
        addIf(
            result,
            'FechaSalida',
            dateFormatter(
                new Date(reservaData['FechaSalida']),
                'yyyyMMddhhmmss'
            )
        );
    }
    addIf(result, 'MotivoViaje', reservaData['MotivoViaje']);
    if (reservaData['LlegadaHora']) {
        addIf(result, 'LlegadaHora', timeFormatter(reservaData['LlegadaHora']));
    }
    addIf(result, 'THFactura', reservaData['THFactura']);
    addIf(result, 'Bienvenida', reservaData['Bienvenida']);
    if (reservaData['FechaBienv']) {
        addIf(
            result,
            'FechaBienv',
            dateFormatter(new Date(reservaData['FechaBienv']), 'yyyyMMdd')
        );
    }
    if (reservaData['HoraBienv']) {
        addIf(result, 'HoraBienv', timeFormatter(reservaData['HoraBienv']));
    }

    return result as Reserva;
}

export function parseToReservaFilter(
    reservaFilterData: Record<string, string>
): ReservaFilter {
    const reservaFilter: Partial<ReservaFilter> = {};

    addIf(reservaFilter, 'hotel', reservaFilterData['hotel']);

    addIf(
        reservaFilter,
        'ReservationNumber',
        reservaFilterData['ReservationNumber']
    );

    if (reservaFilterData['FechaEntrada']) {
        reservaFilter.FechaEntrada = dateFormatter(
            new Date(reservaFilterData['FechaEntrada']),
            'yyyyMMddhhmmss'
        );
    }

    if (reservaFilterData['Estado']) {
        reservaFilter.Estado = parseInt(reservaFilterData['Estado'], 10);
    }

    return reservaFilter as ReservaFilter;
}
export function recordsAreEqual(
    a: Record<string, string>,
    b: Record<string, string>
): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (a[key] !== b[key]) return false;
    }

    return true;
}

export function parseToStringRecord(
    iterable: Iterable<[string, unknown]>
): Record<string, string> {
    const record: Record<string, string> = {};

    for (const [key, value] of iterable) {
        if (value == null || value == undefined || value === '') {
            continue;
        }
        // tratado especial
        // datos que se convierten de forma especial
        type MapperKey = keyof typeof mappers;
        const mappers = {
            FechaEntrada: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
            FechaSalida: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
            FechaBienv: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
            LlegadaHora: (v: string) => timeFormatter(v, false),
            HoraBienv: (v: string) => timeFormatter(v, false),
            FechaNacimiento: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
            FechaExpedicion: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
            FechaCaducidad: (v: string) =>
                dateParser(v)?.toISOString().split('T')[0],
        };
        // se aplica el valor si no es null
        const specialValue =
            key in mappers ? mappers[key as MapperKey](value as string) : null;
        if (specialValue != null) {
            record[key] = specialValue;
            continue;
        }
        if (typeof value === 'string') {
            record[key] = value;
        } else if (typeof value === 'object') {
            // tratar objetos anidados
            for (const [subKey, subValue] of Object.entries(value)) {
                if (subValue) {
                    record[`${key}.${subKey}`] = String(subValue);
                }
            }
        } else {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            record[key] = String(value);
        }
    }
    return record;
}
