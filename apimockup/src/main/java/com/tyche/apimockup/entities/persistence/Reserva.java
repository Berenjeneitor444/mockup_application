package com.tyche.apimockup.entities.persistence;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "reservas")
@Data
public class Reserva implements Entity{

  @Id private String reservationNumber = "";

  @Field(value = "hotel")
  private String hotel = "";

  @Field(value = "checkoutRealized")
  private boolean checkoutRealized = false;

  @Field(value = "CheckIn")
  private String checkIn = "";

  @Field(value = "Localizador")
  private String localizador = "";

  @Field(value = "HotelFactura")
  private String hotelFactura = "";

  @Field(value = "NumReserva")
  private String numReserva = "";

  @Field(value = "Bono")
  private String bono = "";

  @Field(value = "Estado")
  private int estado = 0;

  @Field(value = "Habitacion")
  private String habitacion = "";

  @Field(value = "THDescripcion")
  private String thDescripcion = "";

  @Field(value = "THUso")
  private String thUso = "";

  @Field(value = "Seccion")
  private String seccion = "";

  @Field(value = "Tarifa")
  private String tarifa = "";

  @Field(value = "AD")
  private int ad = 0;

  @Field(value = "NI")
  private int ni = 0;

  @Field(value = "JR")
  private int jr = 0;

  @Field(value = "CU")
  private int cu = 0;

  @Field(value = "PreCheckIn")
  private String preCheckIn = "";

  @Field(value = "FechaEntrada")
  private String fechaEntrada = "";

  @Field(value = "FechaSalida")
  private String fechaSalida = "";

  @Field(value = "MotivoViaje")
  private String motivoViaje = "";

  @Field(value = "LlegadaHora")
  private String llegadaHora = "";

  @Field(value = "THFactura")
  private String thFactura = "";

  @Field(value = "Bienvenida")
  private String bienvenida = "";

  @Field(value = "FechaBienv")
  private String fechaBienv = "";

  @Field(value = "HoraBienv")
  private String horaBienv = "";
}
