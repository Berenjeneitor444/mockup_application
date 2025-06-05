package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;




@Document(collection = "huespedes")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Huesped {

    @JsonProperty("IDHuesped")
    @Id
    private String idHuesped = "";

    @JsonProperty("hotel")
    @Field(value = "hotel")
    private String hotel = "";

    @JsonProperty("reservationNumber")
    @Field(value = "reservationNumber")
    private String reservationNumber = "";

    @JsonProperty("DatosComunicacion")
    @Field(value = "DatosComunicacion")
    private DatosComunicacion datosComunicacion = new DatosComunicacion();

    @JsonProperty("HotelFactura")
    @Field(value = "HotelFactura")
    private String hotelFactura = "";

    @JsonProperty("NumReserva")
    @Field(value = "NumReserva")
    private String numReserva = "";

    @JsonProperty("NumeroCliente")
    @Field(value = "NumeroCliente")
    private String numeroCliente = "";

    @JsonProperty("TipoPersona")
    @Field(value = "TipoPersona")
    private String tipoPersona = "";

    @JsonProperty("Nombre_Pila")
    @Field(value = "Nombre_Pila")
    private String nombrePila = "";

    @JsonProperty("Nombre")
    @Field(value = "Nombre")
    private String nombre = "";

    @JsonProperty("Email")
    @Field(value = "Email")
    private String email = "";

    @JsonProperty("FechaNacimiento")
    @Field(value = "FechaNacimiento")
    private String fechaNacimiento = "";

    @JsonProperty("PaisNacimiento")
    @Field(value = "PaisNacimiento")
    private String paisNacimiento = "";

    @JsonProperty("TipoDocumento")
    @Field(value = "TipoDocumento")
    private String tipoDocumento = "";

    @JsonProperty("FechaExpedicion")
    @Field(value = "FechaExpedicion")
    private String fechaExpedicion = "";

    @JsonProperty("FechaCaducidad")
    @Field(value = "FechaCaducidad")
    private String fechaCaducidad = "";

    @JsonProperty("Edad")
    @Field(value = "Edad")
    private String edad = "";

    @JsonProperty("IDDocumento")
    @Field(value = "IDDocumento")
    private String idDocumento = "";

    @JsonProperty("TipoCliente")
    @Field(value = "TipoCliente")
    private String tipoCliente = "";

    @JsonProperty("Sexo")
    @Field(value = "Sexo")
    private String sexo = "";

    @JsonProperty("AceptaInfo")
    @Field(value = "AceptaInfo")
    private String aceptaInfo = "";

    @JsonProperty("Repetidor")
    @Field(value = "Repetidor")
    private String repetidor = "";

    @JsonProperty("Vip")
    @Field(value = "Vip")
    private String vip = "";

    @JsonProperty("FechaEntrada")
    @Field(value = "FechaEntrada")
    private String fechaEntrada = "";

    @JsonProperty("FechaSalida")
    @Field(value = "FechaSalida")
    private String fechaSalida = "";

    @JsonIgnore // solo estara en la base de datos
    @Field(value = "Firma")
    private String firma = "";
}
