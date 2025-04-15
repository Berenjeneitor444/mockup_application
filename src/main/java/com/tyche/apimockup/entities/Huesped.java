package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;


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
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Huesped implements Entidad{
    @JsonProperty("hotel")
    private String hotel;
    @JsonProperty("reservationNumber")
    private String reservationNumber;
    @JsonProperty("DatosComunicacion")
    private DatosComunicacion datosComunicacion;
    @JsonProperty("HotelFactura")
    private String hotelFactura;
    @JsonProperty("NumReserva")
    private String numReserva;
    @JsonProperty("NumeroCliente")
    private String numeroCliente;
    @JsonProperty("IDHuesped")
    private String idHuesped;
    @JsonProperty("TipoPersona")
    private String tipoPersona;
    @JsonProperty("Nombre_Pila")
    private String nombrePila;
    @JsonProperty("Nombre")
    private String nombre;
    @JsonProperty("Email")
    private String email;
    @JsonProperty("FechaNacimiento")
    private String fechaNacimiento;
    @JsonProperty("PaisNacimiento")
    private String paisNacimiento;
    @JsonProperty("TipoDocumento")
    private String tipoDocumento;
    @JsonProperty("FechaExpedicion")
    private String fechaExpedicion;
    @JsonProperty("FechaCaducidad")
    private String fechaCaducidad;
    @JsonProperty("Edad")
    private String edad;
    @JsonProperty("IDDocumento")
    private String idDocumento;
    @JsonProperty("TipoCliente")
    private String tipoCliente;
    @JsonProperty("Sexo")
    private String sexo;
    @JsonProperty("AceptaInfo")
    private String aceptaInfo;
    @JsonProperty("Repetidor")
    private String repetidor;
    @JsonProperty("Vip")
    private String vip;
    @JsonProperty("FechaEntrada")
    private String fechaEntrada;
    @JsonProperty("FechaSalida")
    private String fechaSalida;
}
