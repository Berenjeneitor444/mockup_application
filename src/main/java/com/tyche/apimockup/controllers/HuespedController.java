package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.Huesped;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.services.HuespedService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/huesped")
public class HuespedController {
    private final HuespedService huespedService;

    public HuespedController(HuespedService huespedService) {
        this.huespedService = huespedService;
    }

    @PostMapping("/crear")
    public HuespedResponse huespedCrear(@RequestBody Huesped huesped) {
        return huespedService.crearHuesped(huesped);
    }
    @PostMapping("/listar")
    public HuespedResponse huespedListar(@RequestBody Map<String, Object> huesped) {
        return huespedService.listarHuesped(huesped);
    }
}
