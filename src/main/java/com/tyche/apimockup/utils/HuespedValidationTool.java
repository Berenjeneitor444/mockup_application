package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.Huesped;
import org.springframework.stereotype.Component;

@Component
public class HuespedValidationTool extends AbstractValidationTool {
    protected HuespedValidationTool() {
        super(new Huesped().getJsonNames());
    }
}
