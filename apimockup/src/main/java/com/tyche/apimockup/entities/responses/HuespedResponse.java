package com.tyche.apimockup.entities.responses;


import com.tyche.apimockup.entities.dtos.output.HuespedOutput;
import java.io.Serializable;
import java.util.List;
import lombok.Getter;

@Getter
public class HuespedResponse extends ApiResponse implements Serializable {
    private final List<HuespedOutput> results;

    public HuespedResponse(String result, String[] errors, List<HuespedOutput> results) {
        super(result, errors);
        this.results = results;
    }
}
