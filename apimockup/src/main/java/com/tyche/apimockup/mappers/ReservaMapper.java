package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.ReservaSaveDTO;
import com.tyche.apimockup.entities.dtos.output.ReservaOutput;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.utils.EntityHelper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservaMapper {
  @Mapping(source = "checkOut", target = "checkoutRealized")
  @Mapping(target = "hotel", expression = "java(entityHelper.hotelFixer(entity))")
  @Mapping(target = "reservationNumber", expression = "java(entityHelper.reservationNumberFixer(entity))")
  Reserva toEntity(ReservaSaveDTO dto, @Context EntityHelper entityHelper);

  ReservaOutput toDTO(Reserva entity);
}
