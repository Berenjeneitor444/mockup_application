package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.DatosComunicacionSaveDTO;
import com.tyche.apimockup.entities.dtos.output.DatosComunicacionOutput;
import com.tyche.apimockup.entities.persistence.DatosComunicacion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DatosComunicacionMapper {
  DatosComunicacion toEntity(DatosComunicacionSaveDTO dto);

  DatosComunicacionOutput toDTO(DatosComunicacion entity);
}
