package com.tyche.apimockup.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.filter.HuespedFilter;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.services.HuespedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/huespedes")
public class HuespedController {
    private final HuespedService huespedService;

    public HuespedController(HuespedService huespedService) {
        this.huespedService = huespedService;
    }

    @PostMapping("/crear")
    public ResponseEntity<HuespedResponse> huespedCrear(
            @RequestBody(required = false)
            @JsonView(Huesped.Vista.Crear.class)
            Huesped huesped) {
        return ResponseEntity.ok(huespedService.crearHuesped(huesped));
    }

    @PostMapping("/listar")
    public ResponseEntity<HuespedResponse> huespedListar(
            @RequestBody(required = false)
            HuespedFilter huesped) {
        return ResponseEntity.ok(huespedService.listarHuesped(huesped));
    }

    @PostMapping("/modificar")

    public ResponseEntity<HuespedResponse> huespedModificar(
            @RequestBody(required = false)
            @JsonView(Huesped.Vista.Crear.class)
            Huesped huesped) {
        return ResponseEntity.ok(huespedService.modificarHuesped(huesped));
    }

    @PostMapping("/listarByDate")
    public ResponseEntity<HuespedResponse> huespedListarPorFecha(
            @RequestBody(required = false)
            HuespedFilter huesped) {
        return ResponseEntity.ok(huespedService.listarHuesped(huesped));
    }
}
