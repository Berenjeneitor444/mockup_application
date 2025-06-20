package com.tyche.apimockup.entities.dtos.output;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class DatosComunicacionOutput {

  @JsonProperty("Descripcion")
  private String descripcion;

  @JsonProperty("Direccion")
  private String direccion;

  @JsonProperty("CodigoPostal")
  private String codigoPostal;

  @JsonProperty("Poblacion")
  private String poblacion;

  @JsonProperty("Provincia")
  private String provincia;

  @JsonProperty("ComunidadAutonoma")
  private String comunidadAutonoma;

  @JsonProperty("Pais")
  private String pais;

  @JsonProperty("ApartadoCorreos")
  private String apartadoCorreos;

  @JsonProperty("Telefono")
  private String telefono;

  @JsonProperty("TelefonoMovil")
  private String telefonoMovil;

  @JsonProperty("FaxNumber")
  private String faxNumber;

  @JsonProperty("EMail")
  private String email;
}
