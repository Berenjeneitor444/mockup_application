import { apiToDate } from '@helpers/date';

interface DatosComunicacion {
  Descripcion: string;
  Direccion: string;
  CodigoPostal: string;
  Poblacion: string;
  Provincia: string;
  ComunidadAutonoma: string;
  Pais: string;
  ApartadoCorreos: string;
  Telefono: string;
  TelefonoMovil: string;
  FaxNumber: string;
  EMail: string;
}

export type TiposPersona = Record<number, string>;

export const tiposPersona: TiposPersona = {
  1: 'AD',
  2: 'JU',
  3: 'NI',
  4: 'CU',
};

/**
 * Vip codes and their descriptions.
 */
export const vipCodes: Record<string, string> = {
  '1': 'Genius',
  '2': 'Rep2-5',
  '3': 'Rep6-9',
  '4': 'Rep+10',
  '7': 'VIP1',
  '8': 'VIP2',
  '9': 'VIP3',
  E: 'Expedia VIP',
  P: 'ExpPremium VIP',
  S: 'VIP2B sin flores',
};

export interface GuestFilter {
  hotel?: string;
  reservationNumber?: string | undefined; // "0000501572"
  fechaEntrada?: string;
  IDHuesped?: string;
}

export class Guest {
  public DatosComunicacion: DatosComunicacion = {} as DatosComunicacion;
  public HotelFactura: string | undefined; // "M4"
  public NumReserva: string | undefined; // "0000546486"
  public NumeroCliente: string | undefined; // "02"
  public IDHuesped: string | undefined; // ""
  public TipoPersona: string | undefined; // "1"
  public Nombre_Pila: string | undefined; // "DONALD THOMAS"
  public Nombre: string | undefined; // ""
  public Email: string | undefined; // ""
  public FechaNacimiento: Date | undefined; // "00000000000000"
  public PaisNacimiento: string | undefined; // ""
  public TipoDocumento: string | undefined; // ""
  public FechaExpedicion: Date | undefined; // "00000000000000"
  public FechaCaducidad: Date | undefined; // "00000000000000"
  public Edad: string | undefined; // "000"
  public IdiomaDocumentos: string | undefined; // ""
  public FechaAltaFID: string | undefined; // ""
  public FechaBajaFID: string | undefined; // ""
  public Comentarios: string | undefined; // ""
  public IDDocumento: string | undefined; // ""
  public TipoCliente: string | undefined; // "AICLUB"
  public Sexo: string | undefined; // ""
  public AceptaInfo: string | undefined; // ""
  public Repetidor: string | undefined; // ""
  public Imagen: string | undefined; // ""
  public Firma: string | undefined; // ""
  public Vip: string | undefined; // ""
  public FechaEntrada: Date | undefined; // "20231014000000"
  public FechaSalida: Date | undefined; // "20231021000000"
  public MotivoViaje:
    | string
    | 'LUNADEMIEL'
    | 'ANIVERSARI'
    | 'VACACIONES'
    | 'CUMPLEAÑOS'
    | 'OTROS' = ''; // "LUNADEMIEL"

  constructor(data?: any) {
    if (data !== undefined) {
      this.DatosComunicacion = data.DatosComunicacion;
      this.HotelFactura = data.HotelFactura;
      this.NumReserva = data.NumReserva;
      this.NumeroCliente = data.NumeroCliente;
      this.IDHuesped = data.IDHuesped;
      this.TipoPersona = data.TipoPersona;
      this.Nombre_Pila = data.Nombre_Pila;
      this.Nombre = data.Nombre;
      this.Email = data.Email;
      this.FechaNacimiento = apiToDate(data.FechaNacimiento);
      this.PaisNacimiento = data.PaisNacimiento;
      this.TipoDocumento = data.TipoDocumento;
      this.FechaExpedicion = apiToDate(data.FechaExpedicion);
      this.FechaCaducidad = apiToDate(data.FechaCaducidad);
      this.Edad = data.Edad;
      this.IdiomaDocumentos = data.IdiomaDocumentos;
      this.FechaAltaFID = data.FechaAltaFID;
      this.FechaBajaFID = data.FechaBajaFID;
      this.Comentarios = data.Comentarios;
      this.IDDocumento = data.IDDocumento;
      this.TipoCliente = data.TipoCliente;
      this.Sexo = data.Sexo;
      this.AceptaInfo = data.AceptaInfo;
      this.Repetidor = data.Repetidor;
      this.Imagen = data.Imagen;
      this.Firma = data.Firma;
      this.Vip = vipCodes[data.Vip] || data.Vip; // Use vipCodes map to get description
      this.FechaEntrada = data.FechaEntrada;
      this.FechaSalida = data.FechaSalida;
    }
  }

  public get displayName(): string {
    if (this.Nombre_Pila && this.Nombre) {
      return `${this.Nombre}, ${this.Nombre_Pila}`;
    } else if (this.Nombre_Pila) {
      return this.Nombre_Pila;
    } else if (this.Nombre) {
      return this.Nombre;
    }
    return '';
  }

  public get isHolder(): boolean {
    return this.NumeroCliente === '01';
  }

  public get checkedIn(): boolean {
    return (
      this.IDHuesped !== undefined &&
      this.IDHuesped !== '' &&
      this.IDDocumento !== undefined &&
      this.IDDocumento !== ''
    );
  }

  /**
   * Return if guest is considered to have completed the form
   */
  public get completed(): boolean {
    return this.Firma !== undefined && this.Firma !== '';
  }
}
