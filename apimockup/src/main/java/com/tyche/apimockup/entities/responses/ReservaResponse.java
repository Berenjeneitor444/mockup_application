package com.tyche.apimockup.entities.responses;

import com.tyche.apimockup.entities.dtos.output.ReservaOutput;
import java.util.List;
import lombok.Getter;

@Getter
public class ReservaResponse extends ApiResponse {
  private final List<ReservaOutput> reservations;

  public ReservaResponse(String result, String[] errors, List<ReservaOutput> reservations) {
    super(result, errors);
    this.reservations = reservations;
  }
}
