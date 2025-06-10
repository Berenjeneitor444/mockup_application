package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DatosComunicacion {

    @JsonProperty("Descripcion")
    @Field(value = "Descripcion")
    private String descripcion = "";

    @JsonProperty("Direccion")
    @Field(value = "Direccion")
    private String direccion = "";

    @JsonProperty("CodigoPostal")
    @Field(value = "CodigoPostal")
    private String codigoPostal = "";

    @JsonProperty("Poblacion")
    @Field(value = "Poblacion")
    private String poblacion = "";

    @JsonProperty("Provincia")
    @Field(value = "Provincia")
    private String provincia = "";

    @JsonProperty("ComunidadAutonoma")
    @Field(value = "ComunidadAutonoma")
    private String comunidadAutonoma = "";

    @JsonProperty("Pais")
    @Field(value = "Pais")
    private String pais = "";

    @JsonProperty("ApartadoCorreos")
    @Field(value = "ApartadoCorreos")
    private String apartadoCorreos = "";

    @JsonProperty("Telefono")
    @Field(value = "Telefono")
    private String telefono = "";

    @JsonProperty("TelefonoMovil")
    @Field(value = "TelefonoMovil")
    private String telefonoMovil = "";

    @JsonProperty("FaxNumber")
    @Field(value = "FaxNumber")
    private String faxNumber = "";

    @JsonProperty("EMail")
    @Field(value = "EMail")
    private String email = "";

}