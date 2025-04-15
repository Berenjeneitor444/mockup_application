package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.Reserva;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.services.ReservaService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/reserva")
public class ReservaController {
    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }
    @PostMapping("/crear")
    public ReservaResponse crearReserva(@RequestBody Reserva reserva) {
        return reservaService.crearReserva(reserva);
    }
    @PostMapping("/listar")
    public ReservaResponse listarReserva(@RequestBody Map<String, Object> reserva) {
        return reservaService.listarReserva(reserva);
    }
}
