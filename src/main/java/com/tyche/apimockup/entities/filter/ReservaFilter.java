package com.tyche.apimockup.entities.filter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaFilter implements Filter {

    @JsonProperty("ReservationNumber")
    private String reservationNumber;

    @JsonProperty("hotel")
    private String hotel;

    @JsonProperty("FechaEntrada")
    private String fechaEntrada;

    @JsonProperty("Estado")
    private String estado;

}
