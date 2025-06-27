package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaCreateDTO implements InputDTO {
  @JsonProperty("ReservationNumber")
  private String reservationNumber = "";

  @JsonProperty("hotel")
  private String hotel = "";

  @JsonProperty("CheckOut")
  private boolean checkOut = false;

  @JsonProperty("CheckIn")
  private String checkIn = "";

  @JsonProperty("Localizador")
  private String localizador = "";

  @JsonProperty("HotelFactura")
  private String hotelFactura = "";

  @JsonProperty("NumReserva")
  private String numReserva = "";

  @JsonProperty("Bono")
  private String bono = "";

  @JsonProperty("Estado")
  private int estado = 0;

  @JsonProperty("Habitacion")
  private String habitacion = "";

  @JsonProperty("THDescripcion")
  private String thDescripcion = "";

  @JsonProperty("THUso")
  private String thUso = "";

  @JsonProperty("Seccion")
  private String seccion = "";

  @JsonProperty("Tarifa")
  private String tarifa = "";

  @JsonProperty("AD")
  private int ad = 0;

  @JsonProperty("NI")
  private int ni = 0;

  @JsonProperty("JR")
  private int jr = 0;

  @JsonProperty("CU")
  private int cu = 0;

  @JsonProperty("PreCheckIn")
  private String preCheckIn = "";

  @JsonProperty("FechaEntrada")
  private String fechaEntrada = "";

  @JsonProperty("FechaSalida")
  private String fechaSalida = "";

  @JsonProperty("MotivoViaje")
  private String motivoViaje = "";

  @JsonProperty("LlegadaHora")
  private String llegadaHora = "";

  @JsonProperty("THFactura")
  private String thFactura = "";

  @JsonProperty("Bienvenida")
  private String bienvenida = "";

  @JsonProperty("FechaBienv")
  private String fechaBienv = "";

  @JsonProperty("HoraBienv")
  private String horaBienv = "";


}
