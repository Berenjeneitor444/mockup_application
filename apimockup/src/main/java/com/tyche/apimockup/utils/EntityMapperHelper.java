package com.tyche.apimockup.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tyche.apimockup.entities.dtos.input.HuespedCreateDTO;
import com.tyche.apimockup.entities.dtos.input.ReservaCreateDTO;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EntityMapperHelper {
  @Autowired private HuespedRepository huespedRepository;
  @Autowired private ObjectMapper objectMapper;

  @Named("motivoViajeFixer")
  public String motivoViajeFixer(Huesped huesped) {
    return huespedRepository.getReservaFromHuesped(huesped).getMotivoViaje();
  }


  public String hotelFixer(String hotel, String hotelFactura) {
    return pickFirstNonEmpty(hotel, hotelFactura);
  }

  public String reservationNumberFixer(String reservationNumber, String numReserva) {
    return pickFirstNonEmpty(reservationNumber, numReserva);
  }

  @Named("checkoutRealizedFixer")
  public Boolean checkoutRealizedFixer(String checkOut){
    if (checkOut == null) return null;

    return "X".equalsIgnoreCase(checkOut);
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
