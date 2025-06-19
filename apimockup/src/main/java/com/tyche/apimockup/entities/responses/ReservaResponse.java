package com.tyche.apimockup.entities.responses;

import com.tyche.apimockup.entities.persistence.Reserva;
import lombok.Getter;

import java.util.List;

@Getter
public class ReservaResponse extends ApiResponse{
    private final Object reservations;

    public ReservaResponse(String result, String[] errors, List<Reserva> reservations) {
        super(result, errors);
        this.reservations = reservations;
    }
}
