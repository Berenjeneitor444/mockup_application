package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.HuespedCreateDTO;
import com.tyche.apimockup.entities.dtos.input.HuespedUpdateDTO;
import com.tyche.apimockup.entities.dtos.input.ReservaCreateDTO;
import com.tyche.apimockup.entities.dtos.output.HuespedOutput;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {DatosComunicacionMapper.class, EntityMapperHelper.class})
public interface HuespedMapper {
  @Mapping(target = "firma", ignore = true)
  Huesped toEntity(HuespedCreateDTO dto, @Context EntityMapperHelper entityMapperHelper);
  @AfterMapping
  default void fieldCoherence(HuespedCreateDTO dto, @MappingTarget Huesped huesped, @Context EntityMapperHelper helper){
    // aveces estos campos vienen en otros atributos, este metodo lo arregla y los pone donde yo los uso
    huesped.setReservationNumber(helper.reservationNumberFixer(dto.getReservationNumber(), dto.getNumReserva()));
    huesped.setHotel(helper.hotelFixer(dto.getHotel(), dto.getHotelFactura()));
    // en caso de que lo anterior no haya cambiado nada, me aseguro de que son iguales
    huesped.setNumReserva(huesped.getReservationNumber());
    huesped.setHotelFactura(huesped.getHotel());
  }
  @Mapping(target = "hotel", ignore = true)
  @Mapping(target = "reservationNumber", ignore = true)
  @Mapping(target = "hotelFactura", ignore = true)
  @Mapping(target = "numReserva", ignore = true)
  @Mapping(target = "firma", ignore = true)

  Huesped toEntity(HuespedUpdateDTO dto);

  @Mapping(target = "motivoViaje", source = "entity", qualifiedByName = "motivoViajeFixer")
  HuespedOutput toDTO(Huesped entity);
}
