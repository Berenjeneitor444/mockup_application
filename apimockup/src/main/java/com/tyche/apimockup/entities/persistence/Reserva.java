package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "reservas")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Reserva {

    @JsonProperty("ReservationNumber")
    @Id
    private String reservationNumber = "";

    @JsonProperty("hotel")
    @Field(value = "hotel")
    private String hotel = "";

    @JsonProperty("checkoutRealized")
    @Field(value = "checkoutRealized")
    private boolean checkoutRealized = false;

    @JsonProperty("CheckIn")
    @Field(value = "CheckIn")
    private String checkIn = "";

    @JsonProperty("Localizador")
    @Field(value = "Localizador")
    private String localizador = "";

    @JsonProperty("HotelFactura")
    @Field(value = "HotelFactura")
    private String hotelFactura = "";

    @JsonProperty("NumReserva")
    @Field(value = "NumReserva")
    private String numReserva = "";

    @JsonProperty("Bono")
    @Field(value = "Bono")
    private String bono = "";

    @JsonProperty("Estado")
    @Field(value = "Estado")
    private int estado = 0;

    @JsonProperty("Habitacion")
    @Field(value = "Habitacion")
    private String habitacion = "";

    @JsonProperty("THDescripcion")
    @Field(value = "THDescripcion")
    private String thDescripcion = "";

    @JsonProperty("THUso")
    @Field(value = "THUso")
    private String thUso = "";

    @JsonProperty("Seccion")
    @Field(value = "Seccion")
    private String seccion = "";

    @JsonProperty("Tarifa")
    @Field(value = "Tarifa")
    private String tarifa = "";

    @JsonProperty("AD")
    @Field(value = "AD")
    private int ad = 0;

    @JsonProperty("NI")
    @Field(value = "NI")
    private int ni = 0;

    @JsonProperty("JR")
    @Field(value = "JR")
    private int jr = 0;

    @JsonProperty("CU")
    @Field(value = "CU")
    private int cu = 0;

    @JsonProperty("PreCheckIn")
    @Field(value = "PreCheckIn")
    private String preCheckIn = "";

    @JsonProperty("FechaEntrada")
    @Field(value = "FechaEntrada")
    private String fechaEntrada = "";

    @JsonProperty("FechaSalida")
    @Field(value = "FechaSalida")
    private String fechaSalida = "";

    @JsonProperty("MotivoViaje")
    @Field(value = "MotivoViaje")
    private String motivoViaje = "";

    @JsonProperty("LlegadaHora")
    @Field(value = "LlegadaHora")
    private String llegadaHora = "";

    @JsonProperty("THFactura")
    @Field(value = "THFactura")
    private String thFactura = "";

    @JsonProperty("Bienvenida")
    @Field(value = "Bienvenida")
    private String bienvenida = "";

    @JsonProperty("FechaBienv")
    @Field(value = "FechaBienv")
    private String fechaBienv = "";

    @JsonProperty("HoraBienv")
    @Field(value = "HoraBienv")
    private String horaBienv = "";
}
