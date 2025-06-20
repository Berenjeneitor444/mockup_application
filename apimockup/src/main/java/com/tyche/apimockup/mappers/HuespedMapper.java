package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.HuespedSaveDTO;
import com.tyche.apimockup.entities.dtos.output.HuespedOutput;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.utils.EntityHelper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = DatosComunicacionMapper.class)
public interface HuespedMapper {
  @Mapping(target = "hotel", expression = "java(entityHelper.hotelFixer(entity))")
  @Mapping(target = "reservationNumber", expression = "java(entityHelper.reservationNumberFixer(entity))")
  Huesped toEntity(HuespedSaveDTO dto, @Context EntityHelper entityHelper);
  @Mapping(target = "motivoViaje", expression = "java(entityHelper.motivoViajeFixer(entity))")

  HuespedOutput toDTO(Huesped entity, @Context EntityHelper entityHelper);
}
