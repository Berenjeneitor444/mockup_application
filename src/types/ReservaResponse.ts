import Reserva from "./Reserva";

export default interface ReservaResponse {
    result: string;
    errors: string[];
    reservations: Reserva[];
  }