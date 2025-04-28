package com.tyche.apimockup.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public interface Entidad {
    String[] validar();
    @JsonIgnore
    default String[] getJsonNames() {
        List<String> annotations = new ArrayList<>();
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(this.getClass(), Object.class).getPropertyDescriptors()) {
                Method getter = pd.getReadMethod();
                if (getter != null && getter.isAnnotationPresent(JsonProperty.class)) {
                    JsonProperty annotation = getter.getAnnotation(JsonProperty.class);
                    annotations.add(annotation.value());
                }
            }
        } catch (IntrospectionException e) {
            throw new RuntimeException("Failed to introspect bean properties", e);
        }
        return annotations.toArray(new String[0]);
    }

}
