package com.tyche.apimockup.entities.persistence;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class DatosComunicacion {

  @Field(value = "Descripcion")
  private String descripcion = "";

  @Field(value = "Direccion")
  private String direccion = "";

  @Field(value = "CodigoPostal")
  private String codigoPostal = "";

  @Field(value = "Poblacion")
  private String poblacion = "";

  @Field(value = "Provincia")
  private String provincia = "";

  @Field(value = "ComunidadAutonoma")
  private String comunidadAutonoma = "";

  @Field(value = "Pais")
  private String pais = "";

  @Field(value = "ApartadoCorreos")
  private String apartadoCorreos = "";

  @Field(value = "Telefono")
  private String telefono = "";

  @Field(value = "TelefonoMovil")
  private String telefonoMovil = "";

  @Field(value = "FaxNumber")
  private String faxNumber = "";

  @Field(value = "EMail")
  private String email = "";
}
