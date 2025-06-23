package com.tyche.apimockup.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tyche.apimockup.entities.dtos.input.HuespedSaveDTO;
import com.tyche.apimockup.entities.dtos.input.ReservaSaveDTO;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EntityMapperHelper {
  @Autowired private HuespedRepository huespedRepository;
  @Autowired private ObjectMapper objectMapper;

  public String motivoViajeFixer(Huesped huesped) {
    return huespedRepository.getReservaFromHuesped(huesped).getMotivoViaje();
  }

  public String hotelFixer(HuespedSaveDTO huesped) {
    return pickFirstNonEmpty(huesped.getHotel(), huesped.getHotelFactura());
  }

  public String reservationNumberFixer(HuespedSaveDTO huesped) {
    return pickFirstNonEmpty(huesped.getReservationNumber(), huesped.getNumReserva());
  }

  public String hotelFixer(ReservaSaveDTO reserva) {
    return pickFirstNonEmpty(reserva.getHotel(), reserva.getHotelFactura());
  }

  public String reservationNumberFixer(ReservaSaveDTO reserva) {
    return pickFirstNonEmpty(reserva.getReservationNumber(), reserva.getNumReserva());
  }
  

  private String pickFirstNonEmpty(String... values) {
    for (String value : values) {
      if (value != null && !value.isEmpty()) {
        return value;
      }
    }
    return null;
  }
}
