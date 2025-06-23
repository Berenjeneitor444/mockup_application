package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.requests.HuespedSaveWrapper;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedSaveDTO {
  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("IDHuesped")
  private String idHuesped = "";

  @JsonView(HuespedSaveWrapper.Vista.Crear.class)
  @JsonProperty("hotel")
  private String hotel = "";

  @JsonView(HuespedSaveWrapper.Vista.Crear.class)
  @JsonProperty("reservationNumber")
  private String reservationNumber = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("DatosComunicacion")
  private DatosComunicacionSaveDTO datosComunicacion = new DatosComunicacionSaveDTO();

  @JsonView(HuespedSaveWrapper.Vista.Crear.class)
  @JsonProperty("HotelFactura")
  private String hotelFactura = "";

  @JsonView(HuespedSaveWrapper.Vista.Crear.class)
  @JsonProperty("NumReserva")
  private String numReserva = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("NumeroCliente")
  private String numeroCliente = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("TipoPersona")
  private String tipoPersona = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Nombre_Pila")
  private String nombrePila = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Nombre")
  private String nombre = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Email")
  private String email = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaNacimiento")
  private String fechaNacimiento = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("PaisNacimiento")
  private String paisNacimiento = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("TipoDocumento")
  private String tipoDocumento = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaExpedicion")
  private String fechaExpedicion = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaCaducidad")
  private String fechaCaducidad = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Edad")
  private String edad = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("IDDocumento")
  private String idDocumento = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("TipoCliente")
  private String tipoCliente = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Sexo")
  private String sexo = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("AceptaInfo")
  private String aceptaInfo = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Repetidor")
  private String repetidor = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Vip")
  private String vip = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaEntrada")
  private String fechaEntrada = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FechaSalida")
  private String fechaSalida = "";
}
