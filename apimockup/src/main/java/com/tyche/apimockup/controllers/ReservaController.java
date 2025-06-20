package com.tyche.apimockup.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.entities.requests.ReservaSaveWrapper;
import com.tyche.apimockup.entities.requests.filter.ReservaFilter;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.mappers.ReservaMapper;
import com.tyche.apimockup.services.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
  private final ReservaService reservaService;
  private final ReservaMapper mapper;
  private final EntityHelper helper

  public ReservaController(ReservaService reservaService, ReservaMapper mapper) {
    this.reservaService = reservaService;
    this.mapper = mapper;
  }

  @PostMapping("/crear")
  public ResponseEntity<ReservaResponse> crearReserva(
      @RequestBody(required = false) @JsonView(ReservaSaveWrapper.Vista.Editar.class)
          ReservaSaveWrapper reservaWrapper) {
    Reserva reserva = mapper.toEntity(reservaWrapper.getD(), );
    return ResponseEntity.ok(reservaService.crearReserva(reserva));
  }

  @PostMapping("/lista")
  public ResponseEntity<ReservaResponse> listarReserva(
      @RequestBody(required = false) ReservaFilter reserva) {
    return ResponseEntity.ok(reservaService.listarReserva(reserva));
  }

  @PostMapping("/modificar")
  public ResponseEntity<ReservaResponse> modificarReserva(
      @RequestBody(required = false) @JsonView(ReservaSaveWrapper.Vista.Editar.class)
          ReservaSaveWrapper reservaWrapper) {
    Reserva reserva = mapper.toEntity(reservaWrapper.getD());
    return ResponseEntity.ok(reservaService.modificarReserva(reserva));
  }
}
