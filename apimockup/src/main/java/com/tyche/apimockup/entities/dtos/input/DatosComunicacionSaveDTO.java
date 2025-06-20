package com.tyche.apimockup.entities.dtos.input;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DatosComunicacionSaveDTO {

  @JsonProperty("Descripcion")
  private String descripcion = "";

  @JsonProperty("Direccion")
  private String direccion = "";

  @JsonProperty("CodigoPostal")
  private String codigoPostal = "";

  @JsonProperty("Poblacion")
  private String poblacion = "";

  @JsonProperty("Provincia")
  private String provincia = "";

  @JsonProperty("ComunidadAutonoma")
  private String comunidadAutonoma = "";

  @JsonProperty("Pais")
  private String pais = "";

  @JsonProperty("ApartadoCorreos")
  private String apartadoCorreos = "";

  @JsonProperty("Telefono")
  private String telefono = "";

  @JsonProperty("TelefonoMovil")
  private String telefonoMovil = "";

  @JsonProperty("FaxNumber")
  private String faxNumber = "";

  @JsonProperty("EMail")
  private String email = "";
}
