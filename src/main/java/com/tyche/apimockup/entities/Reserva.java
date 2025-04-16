package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "reservas")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Reserva implements Entidad{

    @Id
    @JsonProperty("ReservationNumber")
    private String reservationNumber = "";

    @JsonProperty("hotel")
    private String hotel = "";

    @JsonProperty("checkoutRealized")
    private boolean checkoutRealized = false;

    @JsonProperty("CheckIn")
    private String checkIn = "";

    @JsonProperty("Localizador")
    private String localizador = "";

    @JsonProperty("HotelFactura")
    private String hotelFactura = "";

    @JsonProperty("NumReserva")
    private String numReserva = "";

    @JsonProperty("Bono")
    private String bono = "";

    @JsonProperty("Estado")
    private int estado = 0;

    @JsonProperty("Habitacion")
    private String habitacion = "";

    @JsonProperty("THDescripcion")
    private String thDescripcion = "";

    @JsonProperty("THUso")
    private String thUso = "";

    @JsonProperty("Seccion")
    private String seccion = "";

    @JsonProperty("Tarifa")
    private String tarifa = "";

    @JsonProperty("AD")
    private int ad = 0;

    @JsonProperty("NI")
    private int ni = 0;

    @JsonProperty("JR")
    private int jr = 0;

    @JsonProperty("CU")
    private int cu = 0;

    @JsonProperty("PreCheckIn")
    private String preCheckIn = "";

    @JsonProperty("FechaEntrada")
    private String fechaEntrada = "";

    @JsonProperty("FechaSalida")
    private String fechaSalida = "";

    @JsonProperty("MotivoViaje")
    private String motivoViaje = "";

    @JsonProperty("LlegadaHora")
    private String llegadaHora = "";

    @JsonProperty("THFactura")
    private String thFactura = "";

    @JsonProperty("Bienvenida")
    private String bienvenida = "";

    @JsonProperty("FechaBienv")
    private String fechaBienv = "";

    @JsonProperty("HoraBienv")
    private String horaBienv = "";

    @Override
    public String[] validar() {
        List<String> errores = new ArrayList<>();

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
