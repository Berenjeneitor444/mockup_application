package com.tyche.apimockup.entities.dtos.output;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class  ReservaOutput {

  @JsonProperty("ReservationNumber")
  private String reservationNumber;

  @JsonProperty("hotel")
  private String hotel;

  @JsonProperty("checkoutRealized")
  private boolean checkoutRealized;

  @JsonProperty("CheckIn")
  private String checkIn;

  @JsonProperty("Localizador")
  private String localizador;

  @JsonProperty("HotelFactura")
  private String hotelFactura;

  @JsonProperty("NumReserva")
  private String numReserva;

  @JsonProperty("Bono")
  private String bono;

  @JsonProperty("Estado")
  private int estado;

  @JsonProperty("Habitacion")
  private String habitacion;

  @JsonProperty("THDescripcion")
  private String thDescripcion;

  @JsonProperty("THUso")
  private String thUso;

  @JsonProperty("Seccion")
  private String seccion;

  @JsonProperty("Tarifa")
  private String tarifa;

  @JsonProperty("AD")
  private int ad;

  @JsonProperty("NI")
  private int ni;

  @JsonProperty("JR")
  private int jr;

  @JsonProperty("CU")
  private int cu;

  @JsonProperty("PreCheckIn")
  private String preCheckIn;

  @JsonProperty("FechaEntrada")
  private String fechaEntrada;

  @JsonProperty("FechaSalida")
  private String fechaSalida;

  @JsonProperty("MotivoViaje")
  private String motivoViaje;

  @JsonProperty("LlegadaHora")
  private String llegadaHora;

  @JsonProperty("THFactura")
  private String thFactura;

  @JsonProperty("Bienvenida")
  private String bienvenida;

  @JsonProperty("FechaBienv")
  private String fechaBienv;

  @JsonProperty("HoraBienv")
  private String horaBienv;
}
