package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.Entidad;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


abstract class AbstractValidationTool {
    private final String[] camposValidos;

    protected AbstractValidationTool(String[] camposValidos) {
        this.camposValidos = camposValidos;
    }
    public Map<String,Object> prepararMapaFiltrado(Map<String, Object> mapaSucio) {
        // Elimina los campos que no correspondan a la entidad
        Map<String, Object> mapaLimpio = normalizarMapa(mapaSucio);
        return flattenMap(mapaLimpio, null, new java.util.HashMap<>());
    }
    // recorre el mapa y si hay algun hashmap aninado lo recorre recursivamente y lo deja con la notacion
    // objeto.atributo en la key porque mongo lo necesita asi
    private Map<String, Object> flattenMap(Map<String, Object> mapaSucio , String prefix, Map<String, Object> result) {
        for (Map.Entry<String, Object> entry : mapaSucio.entrySet()) {
            // solo tendra prefijo en la llamada recursiva
            String key = prefix != null ? prefix + "." + entry.getKey() : entry.getKey();
            Object value = entry.getValue();

            if (value instanceof Map) {
                // Si el valor es un mapa, llama a la funcion recursivamente
                flattenMap((Map<String, Object>) value, key, result);
            } else {
                result.put(key, value);
            }
        }
        return result;
    }
    public String[] validarEntidad(Entidad entidad) {
        return entidad.validar();
    }
    public Map<String, Object> normalizarMapa(Map<String, Object> mapaSucio){
        // Elimina los campos que no correspondan a la entidad
        Map<String, Object> result = new HashMap<>(mapaSucio);
        for (String key : mapaSucio.keySet()) {
            boolean esCampoValido = false;
            for (String campoValido : camposValidos) {
                if (key.equals(campoValido)) {
                    esCampoValido = true;
                    break;
                }
            }
            if (!esCampoValido) {
                result.remove(key);
            }
        }
        return result;
    }
}
