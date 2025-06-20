package com.tyche.apimockup.entities.dtos.output;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class HuespedOutput {

  @JsonProperty("IDHuesped")
  private String idHuesped;

  @JsonProperty("hotel")
  private String hotel;

  @JsonProperty("DatosComunicacion")
  private DatosComunicacionOutput datosComunicacion;

  @JsonProperty("HotelFactura")
  private String hotelFactura;

  @JsonProperty("NumReserva")
  private String numReserva;

  @JsonProperty("NumeroCliente")
  private String numeroCliente;

  @JsonProperty("TipoPersona")
  private String tipoPersona;

  @JsonProperty("Nombre_Pila")
  private String nombrePila;

  @JsonProperty("Nombre")
  private String nombre;

  @JsonProperty("Email")
  private String email;

  @JsonProperty("FechaNacimiento")
  private String fechaNacimiento;

  @JsonProperty("PaisNacimiento")
  private String paisNacimiento;

  @JsonProperty("TipoDocumento")
  private String tipoDocumento;

  @JsonProperty("FechaExpedicion")
  private String fechaExpedicion;

  @JsonProperty("FechaCaducidad")
  private String fechaCaducidad;

  @JsonProperty("Edad")
  private String edad;

  @JsonProperty("IDDocumento")
  private String idDocumento;

  @JsonProperty("TipoCliente")
  private String tipoCliente;

  @JsonProperty("Sexo")
  private String sexo;

  @JsonProperty("AceptaInfo")
  private String aceptaInfo;

  @JsonProperty("Repetidor")
  private String repetidor;

  @JsonProperty("Vip")
  private String vip;

  @JsonProperty("FechaEntrada")
  private String fechaEntrada;

  @JsonProperty("FechaSalida")
  private String fechaSalida;

  @JsonProperty("Firma")
  private String firma;

  @JsonProperty("MotivoViaje")
  private String motivoViaje;
}
