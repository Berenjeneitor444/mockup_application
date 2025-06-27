package com.tyche.apimockup.mappers;

import com.tyche.apimockup.entities.dtos.input.ReservaCreateDTO;
import com.tyche.apimockup.entities.dtos.input.ReservaUpdateDTO;
import com.tyche.apimockup.entities.dtos.output.ReservaOutput;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = EntityMapperHelper.class)
public interface ReservaMapper {

  @Mapping(
          target = "checkoutRealized",
          source = "checkOut",
          qualifiedByName = "checkoutRealizedFixer")
  Reserva toEntity(ReservaCreateDTO dto, @Context EntityMapperHelper entityMapperHelper);
  @AfterMapping
  default void fieldCoherence(ReservaCreateDTO dto, @MappingTarget Reserva reserva, @Context EntityMapperHelper helper){
    // aveces estos campos vienen en otros atributos, este metodo lo arregla y los pone donde yo los uso
    reserva.setReservationNumber(helper.reservationNumberFixer(dto.getReservationNumber(), dto.getNumReserva()));
    reserva.setHotel(helper.hotelFixer(dto.getHotel(), dto.getHotelFactura()));
    // en caso de que lo anterior no haya cambiado nada, me aseguro de que son iguales
    reserva.setNumReserva(reserva.getReservationNumber());
    reserva.setHotelFactura(reserva.getHotel());
  }

  @Mapping(
      target = "checkoutRealized",
      source = "checkOut",
      qualifiedByName = "checkoutRealizedFixer")
  @Mapping(source = "numReserva", target = "reservationNumber")
  // campos a excluir
  @Mapping(target = "hotel", ignore = true)
  @Mapping(target = "hotelFactura", ignore = true)
  @Mapping(target = "ad", ignore = true)
  @Mapping(target = "ni", ignore = true)
  @Mapping(target = "jr", ignore = true)
  @Mapping(target = "cu", ignore = true)

  Reserva toEntity(ReservaUpdateDTO dto);

  ReservaOutput toDTO(Reserva entity);
}
