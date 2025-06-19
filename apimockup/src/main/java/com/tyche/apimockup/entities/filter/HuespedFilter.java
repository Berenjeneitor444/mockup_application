package com.tyche.apimockup.entities.filter;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedFilter implements Filter {
  @JsonView(Vista.Completo.class)
  @JsonProperty("IDHuesped")
  private String idHuesped;

  @JsonView(Vista.Completo.class)
  @JsonProperty("reservationNumber")
  private String reservationNumber;

  @JsonView(Vista.ListarByDate.class)
  @JsonProperty("hotel")
  private String hotel;

  @JsonView(Vista.ListarByDate.class)
  @JsonProperty("FechaEntrada")
  @JsonAlias("fechaEntrada")
  private String fechaEntrada;

  public interface Vista {
    interface ListarByDate {}

    interface Completo extends ListarByDate {}
  }
}
