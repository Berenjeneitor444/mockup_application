package com.tyche.apimockup.controllers;

import com.tyche.apimockup.exceptions.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BadRequestException> handleBadRequestException(BadRequestException ex) {
        // Captura el mensaje de la excepción y responde con un código 400
        System.err.println(ex.getMessage());
        return new ResponseEntity<BadRequestException>(ex, HttpStatus.BAD_REQUEST);
    }
}