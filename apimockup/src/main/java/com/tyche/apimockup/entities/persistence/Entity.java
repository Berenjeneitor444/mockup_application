package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public interface Entity {
  /**
   * Devuelve el nombre real del campo en MongoDB para un atributo dado. Si no existe, devuelve el
   * mismo nombre de atributo.
   */
  default String getMongoField(String attributeName, Map<String, String> FIELD_MAP) {
    return FIELD_MAP.get(attributeName);
  }

  Map<String, Object> toMap(ObjectMapper objectMapper);
}
