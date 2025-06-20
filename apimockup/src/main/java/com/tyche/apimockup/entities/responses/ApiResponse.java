package com.tyche.apimockup.entities.responses;


import java.io.Serializable;
import lombok.Data;

@Data
public abstract class ApiResponse implements Serializable {
    private final String result;
    private final String[] errors;
}
