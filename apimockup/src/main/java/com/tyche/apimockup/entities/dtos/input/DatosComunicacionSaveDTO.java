package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.requests.HuespedSaveWrapper;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DatosComunicacionSaveDTO {
  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Descripcion")
  private String descripcion = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Direccion")
  private String direccion = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("CodigoPostal")
  private String codigoPostal = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Poblacion")
  private String poblacion = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Provincia")
  private String provincia = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("ComunidadAutonoma")
  private String comunidadAutonoma = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Pais")
  private String pais = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("ApartadoCorreos")
  private String apartadoCorreos = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("Telefono")
  private String telefono = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("TelefonoMovil")
  private String telefonoMovil = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("FaxNumber")
  private String faxNumber = "";

  @JsonView(HuespedSaveWrapper.Vista.Editar.class)
  @JsonProperty("EMail")
  private String email = "";
}
