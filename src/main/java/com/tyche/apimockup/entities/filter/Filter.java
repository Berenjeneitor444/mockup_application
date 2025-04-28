package com.tyche.apimockup.entities.filter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface Filter {

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

    @JsonIgnore
    default boolean isEmpty() {
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(this.getClass(), Object.class).getPropertyDescriptors()) {
                Method getter = pd.getReadMethod();
                if (getter != null) {
                    Object value = getter.invoke(this);
                    if (value != null && !value.toString().isEmpty()) {
                        return false;
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to introspect bean properties", e);
        }
        return true;
    }
    default Map<String, Object> toMap() {
        Map<String, Object> result = new HashMap<>();
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(this.getClass(), Object.class).getPropertyDescriptors()) {
                Method getter = pd.getReadMethod();
                if (getter != null) {
                    Object value = getter.invoke(this);
                    if (value != null) {
                        result.put(pd.getName(), value);
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error reading bean properties", e);
        }
        return result;
    }

}
