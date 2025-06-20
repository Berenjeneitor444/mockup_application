package com.tyche.apimockup.entities.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.dtos.input.ReservaSaveDTO;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaSaveWrapper {
  @JsonProperty("d")
  @JsonView(Vista.Editar.class)
  private ReservaSaveDTO d;

  public interface Vista {
    interface Editar {}

    interface Crear extends Editar {}
  }
}
