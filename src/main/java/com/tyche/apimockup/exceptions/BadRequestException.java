package com.tyche.apimockup.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
    public BadRequestException(Exception e){
        super(e);
    }
}
