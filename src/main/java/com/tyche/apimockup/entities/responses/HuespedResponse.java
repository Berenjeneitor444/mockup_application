package com.tyche.apimockup.entities.responses;

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
