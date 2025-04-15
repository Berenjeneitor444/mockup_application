package com.tyche.apimockup.entities.responses;

import com.tyche.apimockup.entities.Huesped;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class HuespedResponse extends ApiResponse implements Serializable {
    private final Object results;

    public HuespedResponse(String result, String[] errors, Object results) {
        super(result, errors);
        this.results = results;
    }
}
