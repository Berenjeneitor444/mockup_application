package com.tyche.apimockup.entities.responses;

import com.tyche.apimockup.entities.Reserva;
import lombok.Getter;

@Getter
public class ReservaResponse extends ApiResponse{
    private final Object reservations;

    public ReservaResponse(String result, String[] errors, Object reservations) {
        super(result, errors);
        this.reservations = reservations;
    }
}
