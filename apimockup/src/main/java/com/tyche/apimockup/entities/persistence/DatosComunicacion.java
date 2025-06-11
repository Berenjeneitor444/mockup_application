package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DatosComunicacion {

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Descripcion")
    @Field(value = "Descripcion")
    private String descripcion = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Direccion")
    @Field(value = "Direccion")
    private String direccion = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("CodigoPostal")
    @Field(value = "CodigoPostal")
    private String codigoPostal = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Poblacion")
    @Field(value = "Poblacion")
    private String poblacion = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Provincia")
    @Field(value = "Provincia")
    private String provincia = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("ComunidadAutonoma")
    @Field(value = "ComunidadAutonoma")
    private String comunidadAutonoma = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Pais")
    @Field(value = "Pais")
    private String pais = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("ApartadoCorreos")
    @Field(value = "ApartadoCorreos")
    private String apartadoCorreos = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("Telefono")
    @Field(value = "Telefono")
    private String telefono = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("TelefonoMovil")
    @Field(value = "TelefonoMovil")
    private String telefonoMovil = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("FaxNumber")
    @Field(value = "FaxNumber")
    private String faxNumber = "";

    @JsonView(Huesped.Vista.Crear.class)
    @JsonProperty("EMail")
    @Field(value = "EMail")
    private String email = "";

}