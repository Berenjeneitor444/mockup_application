package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
class DatosComunicacion {

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

@Document(collection = "huespedes")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Huesped implements Entidad{

    @JsonProperty("IDHuesped")
    @Field(value = "IDHuesped")
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

    @Override
    public String[] validar() {
        List<String> errores = new ArrayList<>();
        if (idHuesped == null || idHuesped.isEmpty()) {
            errores.add("El ID del huesped no puede estar vacío");
        } else if (! (idHuesped.matches("^\\d{10}$")) ){
            errores.add("ID del huesped no es válido");
        }
        if (hotel == null || hotel.isEmpty()) {
            errores.add("El hotel no puede estar vacío");
        } else if (! (hotel.matches("^M[1-4]$")) ) {
            errores.add("El hotel no es válido");
        }
        if (reservationNumber == null || reservationNumber.isEmpty()) {
            errores.add("El número de reserva no puede estar vacío");
        } else if (! (reservationNumber.matches("^\\d{10}$")) ){
            errores.add("El número de reserva no es válido");
        }

        // ajustar campos para que sean iguales
        hotelFactura = hotel;
        numReserva = reservationNumber;

        return errores.toArray(new String[0]);
    }
}
