package com.tyche.apimockup.entities.responses;

import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.persistence.Huesped;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class HuespedResponse extends ApiResponse implements Serializable {
    @JsonView(Huesped.Vista.Listar.class)
    private final List<Huesped> results;

    public HuespedResponse(String result, String[] errors, List<Huesped> results) {
        super(result, errors);
        this.results = results;
    }
}
