package com.tyche.apimockup.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tyche.apimockup.entities.persistence.DatosComunicacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Collectors;

@Component
public class EntityUtil {
  @Autowired ObjectMapper objectMapper;
  public Map<String, Object> toMap(Object entity){
    return objectMapper
            .convertValue(entity, new TypeReference<Map<String, Object>>() {})
            .entrySet()
            .stream()
            .filter(e -> {
              Object value = e.getValue();
              return value != null && (!(value instanceof String) || !((String) value).isEmpty());
            })
            .collect(Collectors.toMap(Map.Entry::getKey, e -> {
                      // recursividad con DatosComunicacion si esta presente
                      Object val = e.getValue();
                      if (val instanceof DatosComunicacion) {
                        return toMap(val);
                      }
                      return val;
                    }
            ));
  }
}
