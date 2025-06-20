package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EntityHelper {
  @Autowired private HuespedRepository huespedRepository;

  public String motivoViajeFixer(Huesped huesped) {
    return huespedRepository.getReservaFromHuesped(huesped).getMotivoViaje();
  }

  public String hotelFixer(Huesped huesped) {
    boolean hotelExists =
        !(huesped.getHotel() == null || huesped.getHotel().isEmpty());
    boolean hotelFacturaExists =
        !(huesped.getHotelFactura() == null || huesped.getHotelFactura().isEmpty());

    if (hotelExists) {
      return huesped.getHotel();
    } else if (hotelFacturaExists) {
      return huesped.getHotelFactura();
    } else return null;
  }

  public String reservationNumberFixer(Huesped huesped) {
    boolean reservationNumberExists =
        !(huesped.getReservationNumber() == null
            || huesped.getReservationNumber().isEmpty());
    boolean numFacturaExists =
        !(huesped.getNumReserva() == null || huesped.getNumReserva().isEmpty());

    if (reservationNumberExists) {
      return huesped.getReservationNumber();
    } else if (numFacturaExists) {
      return huesped.getNumReserva();
    } else return null;
  }

  public String hotelFixer(Reserva reserva) {
    boolean hotelExists = !(reserva.getHotel() == null || reserva.getHotel().isEmpty());
    boolean hotelFacturaExists =
        !(reserva.getHotelFactura() == null || reserva.getHotelFactura().isEmpty());

    if (hotelExists) {
      return reserva.getHotel();
    } else if (hotelFacturaExists) {
      return reserva.getHotelFactura();
    } else return null;
  }

  public String reservationNumberFixer(Reserva reserva) {
    boolean reservationNumberExists =
        !(reserva.getReservationNumber() == null || reserva.getReservationNumber().isEmpty());
    boolean numFacturaExists =
        !(reserva.getNumReserva() == null || reserva.getNumReserva().isEmpty());

    if (reservationNumberExists) {
      return reserva.getReservationNumber();
    } else if (numFacturaExists) {
      return reserva.getNumReserva();
    } else return null;
  }
}
