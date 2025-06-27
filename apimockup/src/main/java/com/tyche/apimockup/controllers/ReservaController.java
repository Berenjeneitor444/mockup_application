package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.dtos.input.ReservaCreateDTO;
import com.tyche.apimockup.entities.dtos.input.ReservaUpdateDTO;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.entities.requests.InputDTOWrapper;
import com.tyche.apimockup.entities.requests.filter.ReservaFilter;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.mappers.ReservaMapper;
import com.tyche.apimockup.services.ReservaService;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
  private final ReservaService reservaService;
  private final ReservaMapper mapper;
  private final EntityMapperHelper helper;

  public ReservaController(
      ReservaService reservaService, ReservaMapper mapper, EntityMapperHelper helper) {
    this.reservaService = reservaService;
    this.mapper = mapper;
    this.helper = helper;
  }

  @PostMapping("/crear")
  public ResponseEntity<ReservaResponse> crearReserva(
      @RequestBody(required = false) InputDTOWrapper<ReservaCreateDTO> reservaWrapper) {
    Reserva reserva = mapper.toEntity(reservaWrapper.getD(), helper);
    return ResponseEntity.ok(reservaService.crearReserva(reserva));
  }

  @ExceptionHandler(DuplicateKeyException.class)
  public ResponseEntity<ReservaResponse> manejarDuplicateKey(DuplicateKeyException e) {
    return ResponseEntity.ok(
        new ReservaResponse("KO", new String[] {"Ya existe esa reserva"}, null));
  }

  @PostMapping("/lista")
  public ResponseEntity<ReservaResponse> listarReserva(
      @RequestBody(required = false) ReservaFilter reserva) {
    return ResponseEntity.ok(reservaService.listarReserva(reserva));
  }

  @PostMapping("/modificar")
  public ResponseEntity<ReservaResponse> modificarReserva(
      @RequestBody(required = false) InputDTOWrapper<ReservaUpdateDTO> reservaWrapper) {
    Reserva reserva = mapper.toEntity(reservaWrapper.getD());
    return ResponseEntity.ok(reservaService.modificarReserva(reserva));
  }

  @GetMapping("/existe")
  public ResponseEntity<Boolean> reservaExiste(@RequestParam String reservationNumber) {
    return ResponseEntity.ok(reservaService.reservaExiste(reservationNumber));
  }
}
