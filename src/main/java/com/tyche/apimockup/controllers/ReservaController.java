package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.entities.filter.ReservaFilter;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.services.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reserva")
public class ReservaController {
    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }
    @PostMapping("/crear")
    public ResponseEntity<ReservaResponse> crearReserva(@RequestBody(required = false) Reserva reserva) {
        return ResponseEntity.ok(reservaService.crearReserva(reserva));
    }
    @PostMapping("/listar")
    public ResponseEntity<ReservaResponse> listarReserva(@RequestBody(required = false) ReservaFilter reserva) {
        return ResponseEntity.ok(reservaService.listarReserva(reserva));
    }
    @PostMapping("/modificar")
    public ResponseEntity<ReservaResponse> modificarReserva(@RequestBody(required = false) Reserva reserva) {
        return ResponseEntity.ok(reservaService.modificarReserva(reserva));
    }
}
