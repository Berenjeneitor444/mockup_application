package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.DatosComunicacionCreateDTO;
import com.tyche.apimockup.entities.dtos.input.DatosComunicacionUpdateDTO;
import com.tyche.apimockup.entities.dtos.output.DatosComunicacionOutput;
import com.tyche.apimockup.entities.persistence.DatosComunicacion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DatosComunicacionMapper {
  DatosComunicacion toEntity(DatosComunicacionCreateDTO dto);

  DatosComunicacion toEntity(DatosComunicacionUpdateDTO dto);

  DatosComunicacionOutput toDTO(DatosComunicacion entity);
}
