package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
// no hay tipos primitivos para evitar valores por defecto, para no sobreescribir si no se incluyen explicitamente
public class ReservaUpdateDTO implements InputDTO {

  @JsonProperty("CheckOut")
  private String checkOut;

  @JsonProperty("CheckIn")
  private String checkIn;

  @JsonProperty("Localizador")
  private String localizador;

  @JsonProperty("NumReserva")
  private String numReserva;

  @JsonProperty("Bono")
  private String bono;

  @JsonProperty("Estado")
  private Integer estado;

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
