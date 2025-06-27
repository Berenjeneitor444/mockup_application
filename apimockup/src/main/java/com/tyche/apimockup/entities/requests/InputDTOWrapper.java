package com.tyche.apimockup.entities.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tyche.apimockup.entities.dtos.input.InputDTO;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InputDTOWrapper<T extends InputDTO> {
  @JsonProperty("d")
  private T d;
}
