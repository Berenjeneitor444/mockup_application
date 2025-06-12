import _ from 'lodash';
import Huesped from '../types/Huesped';
import Reserva from '../types/Reserva';
import ReservaFilter from '../types/ReservaFilter';
import { dateFormatter, dateParser, timeFormatter } from './DateUtils';

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
    // Construimos directamente el objeto result usando spread condicional
    const datosCom: Huesped['DatosComunicacion'] = {
        ...(huespedData['DatosComunicacion.Descripcion'] && {
            Descripcion: huespedData['DatosComunicacion.Descripcion'],
        }),
        ...(huespedData['DatosComunicacion.Direccion'] && {
            Direccion: huespedData['DatosComunicacion.Direccion'],
        }),
        ...(huespedData['DatosComunicacion.CodigoPostal'] && {
            CodigoPostal: huespedData['DatosComunicacion.CodigoPostal'],
        }),
        ...(huespedData['DatosComunicacion.Poblacion'] && {
            Poblacion: huespedData['DatosComunicacion.Poblacion'],
        }),
        ...(huespedData['DatosComunicacion.Provincia'] && {
            Provincia: huespedData['DatosComunicacion.Provincia'],
        }),
        ...(huespedData['DatosComunicacion.ComunidadAutonoma'] && {
            ComunidadAutonoma:
                huespedData['DatosComunicacion.ComunidadAutonoma'],
        }),
        ...(huespedData['DatosComunicacion.Pais'] && {
            Pais: huespedData['DatosComunicacion.Pais'],
        }),
        ...(huespedData['DatosComunicacion.ApartadoCorreos'] && {
            ApartadoCorreos: huespedData['DatosComunicacion.ApartadoCorreos'],
        }),
        ...(huespedData['DatosComunicacion.Telefono'] && {
            Telefono: huespedData['DatosComunicacion.Telefono'],
        }),
        ...(huespedData['DatosComunicacion.TelefonoMovil'] && {
            TelefonoMovil: huespedData['DatosComunicacion.TelefonoMovil'],
        }),
        ...(huespedData['DatosComunicacion.FaxNumber'] && {
            FaxNumber: huespedData['DatosComunicacion.FaxNumber'],
        }),
        ...(huespedData['DatosComunicacion.EMail'] && {
            EMail: huespedData['DatosComunicacion.EMail'],
        }),
    };

    return {
        ...(huespedData['hotel'] && { hotel: huespedData['hotel'] }),
        ...(huespedData['hotel'] && { HotelFactura: huespedData['hotel'] }),
        ...(huespedData['reservationNumber'] && {
            reservationNumber: huespedData['reservationNumber'],
        }),
        ...(huespedData['reservationNumber'] && {
            NumReserva: huespedData['reservationNumber'],
        }),
        ...(huespedData['NumeroCliente'] && {
            NumeroCliente: huespedData['NumeroCliente'],
        }),
        ...(huespedData['IDHuesped'] && {
            IDHuesped: huespedData['IDHuesped'] ?? '',
        }),
        ...(huespedData['TipoPersona'] && {
            TipoPersona: huespedData['TipoPersona'],
        }),
        ...(huespedData['Nombre_Pila'] && {
            Nombre_Pila: huespedData['Nombre_Pila'],
        }),
        ...(huespedData['Nombre'] && { Nombre: huespedData['Nombre'] }),
        ...(huespedData['Email'] && { Email: huespedData['Email'] }),
        ...(huespedData['FechaNacimiento'] && {
            FechaNacimiento: dateFormatter(
                new Date(huespedData['FechaNacimiento']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(huespedData['PaisNacimiento'] && {
            PaisNacimiento: huespedData['PaisNacimiento'],
        }),
        ...(huespedData['TipoDocumento'] && {
            TipoDocumento: huespedData['TipoDocumento'],
        }),
        ...(huespedData['FechaExpedicion'] && {
            FechaExpedicion: dateFormatter(
                new Date(huespedData['FechaExpedicion']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(huespedData['FechaCaducidad'] && {
            FechaCaducidad: dateFormatter(
                new Date(huespedData['FechaCaducidad']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(huespedData['Edad'] && {
            Edad: huespedData['Edad'].padStart(3, '0'),
        }),
        ...(huespedData['IDDocumento'] && {
            IDDocumento: huespedData['IDDocumento'],
        }),
        ...(huespedData['TipoCliente'] && {
            TipoCliente: huespedData['TipoCliente'],
        }),
        ...(huespedData['Sexo'] && { Sexo: huespedData['Sexo'] }),
        ...(huespedData['AceptaInfo'] && {
            AceptaInfo: huespedData['AceptaInfo'],
        }),
        ...(huespedData['Repetidor'] && {
            Repetidor: huespedData['Repetidor'],
        }),
        ...(huespedData['Vip'] && { Vip: huespedData['Vip'] }),
        ...(huespedData['FechaEntrada'] && {
            FechaEntrada: dateFormatter(
                new Date(huespedData['FechaEntrada']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(huespedData['FechaSalida'] && {
            FechaSalida: dateFormatter(
                new Date(huespedData['FechaSalida']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(Object.keys(datosCom).length > 0 && {
            DatosComunicacion: datosCom,
        }),
    } as Huesped;
}

// -------------------------------------------------------

export function parseToReserva(
    reservaData: Record<string, string | undefined>
): Reserva {
    return {
        ...(reservaData['hotel'] && { hotel: reservaData['hotel'] }),
        ...(reservaData['ReservationNumber'] && {
            ReservationNumber: reservaData['ReservationNumber'],
        }),
        ...(reservaData['checkoutRealized'] != null && {
            checkoutRealized: reservaData['checkoutRealized'] === 'true',
        }),
        ...(reservaData['CheckIn'] && { CheckIn: reservaData['CheckIn'] }),
        ...(reservaData['Localizador'] && {
            Localizador: reservaData['Localizador'],
        }),
        ...(reservaData['hotel'] && { HotelFactura: reservaData['hotel'] }),
        ...(reservaData['ReservationNumber'] && {
            NumReserva: reservaData['ReservationNumber'],
        }),
        ...(reservaData['Bono'] && { Bono: reservaData['Bono'] }),
        ...(typeof reservaData['Estado'] === 'string' && {
            Estado: Math.abs(parseInt(reservaData['Estado'], 10)),
        }),
        ...(reservaData['Habitacion'] && {
            Habitacion: reservaData['Habitacion'],
        }),
        ...(reservaData['THDescripcion'] && {
            THDescripcion: reservaData['THDescripcion'],
        }),
        ...(reservaData['THUso'] && { THUso: reservaData['THUso'] }),
        ...(reservaData['Seccion'] && { Seccion: reservaData['Seccion'] }),
        ...(reservaData['Tarifa'] && { Tarifa: reservaData['Tarifa'] }),
        ...(reservaData['AD'] && { AD: parseInt(reservaData['AD'], 10) }),
        ...(reservaData['NI'] && { NI: parseInt(reservaData['NI'], 10) }),
        ...(reservaData['JR'] && { JR: parseInt(reservaData['JR'], 10) }),
        ...(reservaData['CU'] && { CU: parseInt(reservaData['CU'], 10) }),
        ...(reservaData['PreCheckIn'] && {
            PreCheckIn: reservaData['PreCheckIn'],
        }),
        ...(reservaData['FechaEntrada'] && {
            FechaEntrada: dateFormatter(
                new Date(reservaData['FechaEntrada']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(reservaData['FechaSalida'] && {
            FechaSalida: dateFormatter(
                new Date(reservaData['FechaSalida']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(reservaData['MotivoViaje'] && {
            MotivoViaje: reservaData['MotivoViaje'],
        }),
        ...(reservaData['LlegadaHora'] && {
            LlegadaHora: timeFormatter(reservaData['LlegadaHora']),
        }),
        ...(reservaData['THFactura'] && {
            THFactura: reservaData['THFactura'],
        }),
        ...(reservaData['Bienvenida'] && {
            Bienvenida: reservaData['Bienvenida'],
        }),
        ...(reservaData['FechaBienv'] && {
            FechaBienv: dateFormatter(
                new Date(reservaData['FechaBienv']),
                'yyyyMMdd'
            ),
        }),
        ...(reservaData['HoraBienv'] && {
            HoraBienv: timeFormatter(reservaData['HoraBienv']),
        }),
    } as Reserva;
}

export function parseToReservaFilter(
    reservaFilterData: Record<string, string>
): ReservaFilter {
    return {
        ...(reservaFilterData['hotel'] && {
            hotel: reservaFilterData['hotel'],
        }),
        ...(reservaFilterData['ReservationNumber'] && {
            ReservationNumber: reservaFilterData['ReservationNumber'],
        }),
        ...(reservaFilterData['FechaEntrada'] && {
            FechaEntrada: dateFormatter(
                new Date(reservaFilterData['FechaEntrada']),
                'yyyyMMddhhmmss'
            ),
        }),
        ...(reservaFilterData['Estado'] && {
            Estado: parseInt(reservaFilterData['Estado'], 10),
        }),
    } as ReservaFilter;
}

export function objectsAreEqual(a: object, b: object): boolean {
    return _.isEqual(a, b);
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
export function cleanObject<T extends object>(obj: T): T {
    const result = {} as T;

    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const cleanedNested = cleanObject(value as object);
            if (Object.keys(cleanedNested).length > 0) {
                result[key as keyof T] = cleanedNested as T[keyof T];
            }
        } else if (value !== null && value !== undefined && value !== '') {
            // Solo valores no vacíos y no nulos
            result[key as keyof T] = value as T[keyof T];
        }
    }

    return result;
}
