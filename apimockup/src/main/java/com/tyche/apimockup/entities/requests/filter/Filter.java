package com.tyche.apimockup.entities.requests.filter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.Serializable;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public interface Filter extends Serializable {

  @JsonIgnore
  default Map<String, Object> toMap() {
    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, Object> map = objectMapper.convertValue(this, new TypeReference<>() {});
    map.entrySet().removeIf(entry -> entry.getValue() == null);
    return map;
  }
}
