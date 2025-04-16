package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public interface Entidad {
    String[] validar();
    @JsonIgnore
    default String[] getJsonNames(){
        List<String> annotations = new ArrayList<>();
        for(Field field : this.getClass().getDeclaredFields()){
            JsonProperty annotation = field.getAnnotation(JsonProperty.class);
            if (annotation != null) {
                annotations.add(annotation.value());
            }
        }
        return annotations.toArray(new String[0]);
    }
}
