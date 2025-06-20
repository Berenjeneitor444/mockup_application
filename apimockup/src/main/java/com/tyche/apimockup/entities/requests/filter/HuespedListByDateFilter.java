package com.tyche.apimockup.entities.requests.filter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedListByDateFilter implements Filter {
  @JsonProperty("IDHuesped")
  private String idHuesped;

  @JsonProperty("hotel")
  private String hotel;

  @JsonProperty("fechaEntrada")
  private String fechaEntrada;
}
