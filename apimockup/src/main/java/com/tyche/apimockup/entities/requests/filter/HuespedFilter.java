package com.tyche.apimockup.entities.requests.filter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedFilter implements Filter {

  @JsonProperty("IDHuesped")
  private String idHuesped;

  @JsonProperty("reservationNumber")
  private String reservationNumber;

  @JsonProperty("hotel")
  private String hotel;

  @JsonProperty("FechaEntrada")
  private String fechaEntrada;
}
