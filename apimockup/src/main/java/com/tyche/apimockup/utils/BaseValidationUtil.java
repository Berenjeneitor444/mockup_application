package com.tyche.apimockup.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.ArrayList;
import java.util.List;

@Component
public abstract class BaseValidationUtil<T> {

    public String[] validarTotalidad(T entity, boolean isCreate) {

        List<String> errores = new ArrayList<>();
        List<String> erroresFormato = validarFormato(entity, isCreate);
        List<String> erroresPersistencia = validarPersistencia(entity, isCreate);

        if (erroresFormato != null && !erroresFormato.isEmpty()) {
            errores.addAll(erroresFormato);
        }
        if (erroresPersistencia != null && !erroresPersistencia.isEmpty()) {
            errores.addAll(erroresPersistencia);
        }

        return errores.toArray(new String[0]);

    }

    protected static boolean esFechaValida(String fecha) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuuMMddHHmmss")
                .withResolverStyle(ResolverStyle.STRICT);
        try {
            LocalDate.parse(fecha, formatter);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    protected abstract List<String> validarFormato(T entity, boolean isCreate);

    protected abstract List<String> validarPersistencia(T entity, boolean isCreate);
}
