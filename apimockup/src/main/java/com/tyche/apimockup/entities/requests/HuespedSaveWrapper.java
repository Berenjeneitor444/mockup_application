package com.tyche.apimockup.entities.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.dtos.input.HuespedSaveDTO;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedSaveWrapper {
  @JsonProperty("d")
  @JsonView(Vista.Editar.class)
  private HuespedSaveDTO d;

  public interface Vista {
    interface Editar {}

    interface Crear extends Editar {}
  }
}
