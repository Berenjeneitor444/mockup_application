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
    // recorre el mapa y si hay algun hashmap aninado lo recorre recursivamente y lo deja con la notacion
    // objeto.atributo en la key porque mongo lo necesita asi

    public String[] validarEntidad(Entidad entidad) {
        return entidad.validar();
    }
}
