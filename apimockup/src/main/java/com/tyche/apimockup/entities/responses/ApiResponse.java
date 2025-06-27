package com.tyche.apimockup.entities.responses;


import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class ApiResponse implements Serializable {
    private final String result;
    private final String[] errors;
}
