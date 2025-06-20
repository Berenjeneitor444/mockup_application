package com.tyche.apimockup.entities.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tyche.apimockup.entities.dtos.input.HuespedSaveDTO;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HuespedSaveWrapper {
  @JsonProperty("d")
  private HuespedSaveDTO d;
}
