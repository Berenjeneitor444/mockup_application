package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.ReservaSaveDTO;
import com.tyche.apimockup.entities.dtos.output.ReservaOutput;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Map;

@Mapper(componentModel = "spring", uses = EntityMapperHelper.class)
public interface ReservaMapper {
  @Mapping(source = "checkOut", target = "checkoutRealized")
  @Mapping(target = "hotel", expression = "java(entityMapperHelper.hotelFixer(dto))")
  @Mapping(target = "reservationNumber", expression = "java(entityMapperHelper.reservationNumberFixer(dto))")
  Reserva toEntity(ReservaSaveDTO dto, @Context EntityMapperHelper entityMapperHelper);

  ReservaOutput toDTO(Reserva entity);
}
