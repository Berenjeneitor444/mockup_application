package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.HuespedSaveDTO;
import com.tyche.apimockup.entities.dtos.output.HuespedOutput;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = DatosComunicacionMapper.class)
public interface HuespedMapper {
  @Mapping(target = "hotel", expression = "java(entityMapperHelper.hotelFixer(dto))")
  @Mapping(
      target = "reservationNumber",
      expression = "java(entityMapperHelper.reservationNumberFixer(dto))")
  Huesped toEntity(HuespedSaveDTO dto, @Context EntityMapperHelper entityMapperHelper);

  @Mapping(target = "motivoViaje", expression = "java(entityMapperHelper.motivoViajeFixer(entity))")
  HuespedOutput toDTO(Huesped entity, @Context EntityMapperHelper entityMapperHelper);
}
