package com.tyche.apimockup.entities.responses;


import lombok.Data;


import java.io.Serializable;

@Data
public abstract class ApiResponse implements Serializable {
    private final String result;
    private final String[] errors;
}
