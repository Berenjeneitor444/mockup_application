package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
class DatosComunicacion {
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

@Document(collection = "huespedes")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Huesped implements Entidad{
    @Id
    @JsonProperty("IDHuesped")
    private String idHuesped = "";
    @JsonProperty("hotel")
    private String hotel = "";
    @JsonProperty("reservationNumber")
    private String reservationNumber = "";
    @JsonProperty("DatosComunicacion")
    private DatosComunicacion datosComunicacion = new DatosComunicacion();
    @JsonProperty("HotelFactura")
    private String hotelFactura = "";
    @JsonProperty("NumReserva")
    private String numReserva = "";
    @JsonProperty("NumeroCliente")
    private String numeroCliente = "";
    @JsonProperty("TipoPersona")
    private String tipoPersona = "";
    @JsonProperty("Nombre_Pila")
    private String nombrePila = "";
    @JsonProperty("Nombre")
    private String nombre = "";
    @JsonProperty("Email")
    private String email = "";
    @JsonProperty("FechaNacimiento")
    private String fechaNacimiento = "";
    @JsonProperty("PaisNacimiento")
    private String paisNacimiento = "";
    @JsonProperty("TipoDocumento")
    private String tipoDocumento = "";
    @JsonProperty("FechaExpedicion")
    private String fechaExpedicion = "";
    @JsonProperty("FechaCaducidad")
    private String fechaCaducidad = "";
    @JsonProperty("Edad")
    private String edad = "";
    @JsonProperty("IDDocumento")
    private String idDocumento = "";
    @JsonProperty("TipoCliente")
    private String tipoCliente = "";
    @JsonProperty("Sexo")
    private String sexo = "";
    @JsonProperty("AceptaInfo")
    private String aceptaInfo = "";
    @JsonProperty("Repetidor")
    private String repetidor = "";
    @JsonProperty("Vip")
    private String vip = "";
    @JsonProperty("FechaEntrada")
    private String fechaEntrada = "";
    @JsonProperty("FechaSalida")
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
