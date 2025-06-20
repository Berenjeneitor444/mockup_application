package com.tyche.apimockup.entities.requests.filter;

import com.fasterxml.jackson.annotation.JsonAlias;
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
  @JsonAlias("fechaEntrada")
  private String fechaEntrada;

  @JsonProperty("Estado")
  private Integer estado;
}
