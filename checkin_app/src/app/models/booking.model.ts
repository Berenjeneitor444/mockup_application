import { apiToDate } from '@helpers/date';
import { Guest } from './guest.model';

export interface BookingFilter {
  hotel?: string;
  reservationNumber?: string; // "0000501572"
  fechaEntrada?: string;
  Estado?: string; // 03=CONFIRMED, 05=NOSHOW
}

export enum BookingStatuses {
  PENDING = 'pending',
  PRECHECKIN = 'pre-checkin',
  WAITING = 'waiting',
  INPROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export class Booking {
  public checkoutRealized: boolean | undefined;
  public CheckIn: string | undefined; // "20231010000000"
  public Localizador: string | undefined; // "MAJE231010LDWJ"
  public HotelFactura: string | undefined; // "M4"
  public NumReserva: string | undefined; // "0000501572"
  public Bono: string | undefined; // "MAJE231010LDWJ"
  public EntidadNegocio: string | undefined; // "CALL CENTER MAJESTIC",
  public Estado: string | undefined; // 03=CONFIRMED, 05=NOSHOW
  public Habitacion: string | undefined; // "203"
  public THDescripcion: string | undefined; // "CLUB PLUNGE POOL SUITE",
  public THUso: string | undefined; // "W_CALL_USA",
  public AD: number | undefined; // 2
  public NI: number | undefined; // 0
  public JR: number | undefined; // 0
  public CU: number | undefined; // 0
  public PreCheckIn: string | undefined; // "",
  public Canal: string | undefined; // "CALLCENTER",
  public FechaEntrada: Date | undefined; // "20231010000000",
  public FechaSalida: Date | undefined; // "20231017000000",
  public MotivoViaje: string | undefined; // "LUNADEMIEL",
  public LlegadaHora: string | undefined; // "120000",
  public LlegadaVuelo: string | undefined; // "",
  public SalidaVuelo: string | undefined; // "",
  public THFactura: string | undefined; // "AICLUB"
  public Bienvenida: string = ''; // "X"=true ""=false
  public FechaBienv: string | undefined; // "AAAAMMDD",
  public HoraBienv: string | undefined; // "HHMMSS",
  public FechaHoraBienv: Date | undefined;
  public Seccion: string | undefined; // "CLUB|FAMILIAR"

  public guests?: Guest[] = [];

  constructor(data?: any) {
    if (data !== undefined) {
      this.checkoutRealized = data.checkoutRealized;
      this.CheckIn = data.CheckIn;
      this.Localizador = data.Localizador;
      this.HotelFactura = data.HotelFactura;
      this.NumReserva = data.NumReserva;
      this.Bono = data.Bono;
      this.EntidadNegocio = data.EntidadNegocio;
      this.Estado = data.Estado;
      this.Habitacion = data.Habitacion;
      this.THDescripcion = data.THDescripcion;
      this.THUso = data.THUso;
      this.AD = data.AD;
      this.NI = data.NI;
      this.JR = data.JR;
      this.CU = data.CU;
      this.PreCheckIn = data.PreCheckIn;
      this.Canal = data.Canal;
      this.FechaEntrada = apiToDate(data.FechaEntrada);
      this.FechaSalida = apiToDate(data.FechaSalida);
      this.MotivoViaje = data.MotivoViaje;
      this.LlegadaHora = data.LlegadaHora;
      this.LlegadaVuelo = data.LlegadaVuelo;
      this.SalidaVuelo = data.SalidaVuelo;
      this.THFactura = data.THFactura;
      this.guests = data.guests
        ? data.guests.map((guest: any) => new Guest(guest))
        : [];
      this.Bienvenida = data.Bienvenida;
      this.FechaBienv = data.FechaBienv;
      this.HoraBienv = data.HoraBienv;
      this.FechaHoraBienv =
        data.FechaBienv && data.HoraBienv
          ? apiToDate(data.FechaBienv + data.HoraBienv)
          : undefined;
      this.Seccion = data.Seccion;
    }
  }

  /**
   * Get the holder of the booking
   */
  public get holder(): Guest | undefined {
    return this.guests?.find((guest: Guest) => guest.NumeroCliente === '01');
  }

  /**
   * Get the other guests that are not the holder
   */
  public get otherGuests(): Guest[] | undefined {
    return this.guests?.filter((guest: Guest) => guest.NumeroCliente !== '01');
  }

  /**
   * Get the number of nights of the booking
   */
  public get daysCount(): number | undefined {
    if (this.FechaEntrada && this.FechaSalida) {
      return Math.ceil(
        (this.FechaSalida.getTime() - this.FechaEntrada.getTime()) /
          (1000 * 3600 * 24)
      );
    }
    return undefined;
  }

  /**
   * Return whether the booking is ready for check-in
   * All adults must have an IDHuesped
   */
  public get checkInReady(): boolean {
    return (this.guests && this.guests?.length > 0) || false;
  }

  /**
   * Return whether the booking is been completed in the app
   */
  public get completed(): boolean {
    return (
      (this.guests &&
        this.guests?.length > 0 &&
        this.guests
          ?.filter((guest: Guest) => guest.TipoPersona === '1')
          ?.every((guest: Guest) => guest.completed === true)) ||
      false
    );
  }

  /**
   * Return booking completion status:
   *  - COMPLETED: checkin completed
   *  - PRECHECKIN: pre-checkin
   *  - INPROGRESS: some guests checked in and Bienvenida is true
   *  - WAITING: Bienvenida is true and no guests checked in yet
   *  - PENDING: no guests checked in and Bienvenida is false
   */
  public get checkinStatus(): BookingStatuses {
    if (this.CheckIn && this.guests?.every((guest: Guest) => guest.checkedIn)) {
      return BookingStatuses.COMPLETED; // checkin completado
    } else if (this.PreCheckIn) {
      return BookingStatuses.PRECHECKIN; // pre-checkin
    } else if (
      this.guests?.some((guest: Guest) => guest.checkedIn) &&
      this.Bienvenida
    ) {
      return BookingStatuses.INPROGRESS; // en curso
    } else if (
      this.Bienvenida &&
      !this.guests?.some((guest: Guest) => guest.checkedIn)
    ) {
      return BookingStatuses.WAITING; // en espera
    } else {
      return BookingStatuses.PENDING; // pendiente
    }
  }

  /**
   * Return the purpose of stay of the holder.
   */
  public get purposeOfStay(): string {
    const value = this.MotivoViaje || this.holder?.MotivoViaje;
    switch (value) {
      case 'ANIVERSARI':
        return 'Aniversario';
      case 'CUMPLEAÑOS':
        return 'Cumpleaños';
      case 'LUNADEMIEL':
        return 'Luna de miel';
      case 'VACACIONES':
        return 'Vacaciones';
      case 'OTROS':
        return 'Otro';
      default:
        return '';
    }
  }

  /**
   * Add or update a guest in the booking
   * @param guest
   */
  public addOrUpdateGuest(guest: Guest): boolean {
    console.log('addOrUpdateGuest', this.guests);
    const index = this.guests?.findIndex(
      (g: Guest) =>
        g.IDHuesped === guest.IDHuesped ||
        (g.NumReserva === guest.NumeroCliente &&
          g.NumeroCliente === guest.NumeroCliente)
    );
    if (index !== undefined && index !== -1) {
      console.log('Updating guest', this.guests?.[index], guest);
      this.guests?.splice(index, 1, guest);
      return false;
    } else {
      console.log('Guest not found', index, this.guests, guest);
      this.guests?.push(guest);
      return true;
    }
  }
}
