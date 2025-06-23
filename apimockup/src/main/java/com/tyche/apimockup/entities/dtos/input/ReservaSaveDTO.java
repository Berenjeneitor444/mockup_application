package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.requests.ReservaSaveWrapper;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaSaveDTO {
  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("ReservationNumber")
  private String reservationNumber = "";

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("hotel")
  private String hotel = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("CheckOut")
  private boolean checkOut = false;

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("CheckIn")
  private String checkIn = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Localizador")
  private String localizador = "";

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("HotelFactura")
  private String hotelFactura = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("NumReserva")
  private String numReserva = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Bono")
  private String bono = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Estado")
  private int estado = 0;

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Habitacion")
  private String habitacion = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("THDescripcion")
  private String thDescripcion = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("THUso")
  private String thUso = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Seccion")
  private String seccion = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Tarifa")
  private String tarifa = "";

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("AD")
  private int ad = 0;

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("NI")
  private int ni = 0;

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("JR")
  private int jr = 0;

  @JsonView(ReservaSaveWrapper.Vista.Crear.class)
  @JsonProperty("CU")
  private int cu = 0;

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("PreCheckIn")
  private String preCheckIn = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaEntrada")
  private String fechaEntrada = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaSalida")
  private String fechaSalida = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("MotivoViaje")
  private String motivoViaje = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("LlegadaHora")
  private String llegadaHora = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("THFactura")
  private String thFactura = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("Bienvenida")
  private String bienvenida = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaBienv")
  private String fechaBienv = "";

  @JsonView(ReservaSaveWrapper.Vista.Editar.class)
  @JsonProperty("HoraBienv")
  private String horaBienv = "";


}
