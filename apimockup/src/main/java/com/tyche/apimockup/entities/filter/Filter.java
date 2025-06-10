package com.tyche.apimockup.entities.filter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.Serializable;
import java.util.Map;


public interface Filter extends Serializable {

    @JsonIgnore
    default boolean isEmpty() {
        Map<String, Object> map = toMap();
        for (String key : map.keySet()) {
            if (map.get(key) != null && !map.get(key).toString().isEmpty()) {
                return false;
            }
        }
        return true;
    }
    @JsonIgnore
    default Map<String, Object> toMap() {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(this, new TypeReference<>() {});
        map.entrySet().removeIf(entry -> entry.getValue() == null);
        return map;
    }

}
