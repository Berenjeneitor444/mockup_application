package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.Reserva;
import org.springframework.stereotype.Component;

@Component
public class ReservaValidationTool extends AbstractValidationTool{
    protected ReservaValidationTool() {
        super(new Reserva().getJsonNames());
    }
}
