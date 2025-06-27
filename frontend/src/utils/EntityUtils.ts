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
    const datosCom: Huesped['DatosComunicacion'] = {
        Descripcion: huespedData['DatosComunicacion.Descripcion'] ?? '',
        Direccion: huespedData['DatosComunicacion.Direccion'] ?? '',
        CodigoPostal: huespedData['DatosComunicacion.CodigoPostal'] ?? '',
        Poblacion: huespedData['DatosComunicacion.Poblacion'] ?? '',
        Provincia: huespedData['DatosComunicacion.Provincia'] ?? '',
        ComunidadAutonoma:
            huespedData['DatosComunicacion.ComunidadAutonoma'] ?? '',
        Pais: huespedData['DatosComunicacion.Pais'] ?? '',
        ApartadoCorreos: huespedData['DatosComunicacion.ApartadoCorreos'] ?? '',
        Telefono: huespedData['DatosComunicacion.Telefono'] ?? '',
        TelefonoMovil: huespedData['DatosComunicacion.TelefonoMovil'] ?? '',
        FaxNumber: huespedData['DatosComunicacion.FaxNumber'] ?? '',
        EMail: huespedData['DatosComunicacion.EMail'] ?? '',
    };

    return {
        hotel: huespedData['hotel'] ?? '',
        HotelFactura: huespedData['hotel'] ?? '',
        reservationNumber: huespedData['reservationNumber'] ?? '',
        NumReserva: huespedData['reservationNumber'] ?? '',
        NumeroCliente: huespedData['NumeroCliente'] ?? '',
        IDHuesped: huespedData['IDHuesped'] ?? '',
        TipoPersona: huespedData['TipoPersona'] ?? '',
        Nombre_Pila: huespedData['Nombre_Pila'] ?? '',
        Nombre: huespedData['Nombre'] ?? '',
        Email: huespedData['DatosComunicacion.EMail'] ?? '',
        FechaNacimiento: huespedData['FechaNacimiento']
            ? dateFormatter(
                  dateParser(huespedData['FechaNacimiento']),
                  'yyyyMMddhhmmss'
              )
            : '',
        PaisNacimiento: huespedData['PaisNacimiento'] ?? '',
        TipoDocumento: huespedData['TipoDocumento'] ?? '',
        FechaExpedicion: huespedData['FechaExpedicion']
            ? dateFormatter(
                  dateParser(huespedData['FechaExpedicion']),
                  'yyyyMMddhhmmss'
              )
            : '',
        FechaCaducidad: huespedData['FechaCaducidad']
            ? dateFormatter(
                  dateParser(huespedData['FechaCaducidad']),
                  'yyyyMMddhhmmss'
              )
            : '',
        Edad: huespedData['Edad']?.padStart(3, '0'),
        IDDocumento: huespedData['IDDocumento'] ?? '',
        TipoCliente: huespedData['TipoCliente'] ?? '',
        Sexo: huespedData['Sexo'] ?? '',
        AceptaInfo: huespedData['AceptaInfo'] ?? '',
        Repetidor: huespedData['Repetidor'] ?? '',
        Vip: huespedData['Vip'] ?? '',
        FechaEntrada: huespedData['FechaEntrada']
            ? dateFormatter(
                  dateParser(huespedData['FechaEntrada']),
                  'yyyyMMddhhmmss'
              )
            : '',
        FechaSalida: huespedData['FechaSalida']
            ? dateFormatter(
                  dateParser(huespedData['FechaSalida']),
                  'yyyyMMddhhmmss'
              )
            : '',
        DatosComunicacion: datosCom,
    } as Huesped;
}

// -------------------------------------------------------

export function parseToReserva(
    reservaData: Record<string, string | undefined>
): Reserva {
    return {
        hotel: reservaData['hotel'] ?? '',
        ReservationNumber: reservaData['ReservationNumber'] ?? '',
        checkoutRealized: reservaData['checkoutRealized'] === 'true',
        CheckIn: reservaData['CheckIn'] ?? '',
        Localizador: reservaData['Localizador'] ?? '',
        HotelFactura: reservaData['hotel'] ?? '',
        NumReserva: reservaData['ReservationNumber'] ?? '',
        Bono: reservaData['Bono'] ?? '',
        Estado: Math.abs(parseInt(reservaData['Estado'] || '0', 10)),
        Habitacion: reservaData['Habitacion'] ?? '',
        THDescripcion: reservaData['THDescripcion'] ?? '',
        THUso: reservaData['THUso'] ?? '',
        Seccion: reservaData['Seccion'] ?? '',
        Tarifa: reservaData['Tarifa'] ?? '',
        AD: parseInt(reservaData['AD'] || '0', 10),
        NI: parseInt(reservaData['NI'] || '0', 10),
        JR: parseInt(reservaData['JR'] || '0', 10),
        CU: parseInt(reservaData['CU'] || '0', 10),
        PreCheckIn: reservaData['PreCheckIn'] ?? '',
        FechaEntrada: reservaData['FechaEntrada']
            ? dateFormatter(
                  dateParser(reservaData['FechaEntrada']),
                  'yyyyMMddhhmmss'
              )
            : '',
        FechaSalida: reservaData['FechaSalida']
            ? dateFormatter(
                  dateParser(reservaData['FechaSalida']),
                  'yyyyMMddhhmmss'
              )
            : '',
        MotivoViaje: reservaData['MotivoViaje'] ?? '',
        LlegadaHora: reservaData['LlegadaHora']
            ? timeFormatter(reservaData['LlegadaHora'])
            : '',
        THFactura: reservaData['THFactura'] ?? '',
        Bienvenida: reservaData['Bienvenida'] ?? '',
        FechaBienv: reservaData['FechaBienv']
            ? dateFormatter(dateParser(reservaData['FechaBienv']), 'yyyyMMdd')
            : '',
        HoraBienv: reservaData['HoraBienv']
            ? timeFormatter(reservaData['HoraBienv'])
            : '',
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
                dateParser(reservaFilterData['FechaEntrada']),
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

// -----------------------------------------

export function parseSexo(sexo: string | undefined): string {
    switch (sexo) {
        case '1':
            return 'Masculino';
        case '2':
            return 'Femenino';
        default:
            return 'N/A';
    }
}

export function parseTipoPersona(tipoPersona: string | undefined): string {
    switch (tipoPersona) {
        case '1':
            return 'Adulto';
        case '2':
            return 'Junior';
        case '3':
            return 'Niño';
        case '4':
            return 'Cunado';
        default:
            return 'N/A';
    }
}

export function parseNumeroCliente(numeroCliente: string | undefined): string {
    switch (numeroCliente) {
        case '01':
            return 'Titular de la Reserva';
        case undefined:
            return 'No especificado';
        default:
            return 'Acompañante';
    }
}

export function parseTipoDocumento(tipoDocumento: string | undefined): string {
    return tipoDocumento === '2' ? 'Pasaporte' : 'DNI';
}

export function parseEstadoReserva(estado: number | undefined): string {
    switch (estado) {
        case 1:
            return 'Tentativo';
        case 2:
            return 'Espera de confirmación';
        case 3:
            return 'Confirmada';
        case 4:
            return 'Denegada';
        case 5:
            return 'No-show';
        case 6:
            return 'Cancelada';
        case 9:
            return 'Lista de espera';
        default:
            return 'N/A';
    }
}
export function parseVip(vip: string | undefined): string {
    switch (vip) {
        case '1':
            return 'Genius';
        case '2':
            return 'Rep2-5';
        case '3':
            return 'Rep6-9';
        case '4':
            return 'Rep+10';
        case '7':
            return 'VIP1';
        case '8':
            return 'VIP2';
        case '9':
            return 'VIP3';
        case 'E':
            return 'Expedia VIP';
        case 'P':
            return 'ExpPremium VIP';
        case 'S':
            return 'VIP2B sin flores';
        default:
            return 'N/A';
    }
}
