package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.requests.HuespedSaveWrapper;
import com.tyche.apimockup.entities.requests.filter.HuespedFilter;
import com.tyche.apimockup.entities.requests.filter.HuespedListByDateFilter;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.mappers.HuespedMapper;
import com.tyche.apimockup.services.HuespedService;
import com.tyche.apimockup.utils.EntityHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/huespedes")
public class HuespedController {

  private final HuespedService huespedService;
  private final HuespedMapper mapper;
  private final EntityHelper helper;

  public HuespedController(HuespedService huespedService, HuespedMapper mapper, EntityHelper helper) {
    this.huespedService = huespedService;
    this.mapper = mapper;
    this.helper = helper;
  }

  @PostMapping("/crear")
  public ResponseEntity<HuespedResponse> huespedCrear(
      @RequestBody(required = false) HuespedSaveWrapper huespedWrapper) {
    Huesped huesped = mapper.toEntity(huespedWrapper.getD(), helper);
    return ResponseEntity.ok(huespedService.crearHuesped(huesped));
  }

  @PostMapping("/listar")
  public ResponseEntity<HuespedResponse> huespedListar(
      @RequestBody(required = false) HuespedFilter huesped) {
    return ResponseEntity.ok(huespedService.listarHuesped(huesped));
  }

  @PostMapping("/modificar")
  public ResponseEntity<HuespedResponse> huespedModificar(
      @RequestBody(required = false) HuespedSaveWrapper huespedWrapper) {
    Huesped huesped = mapper.toEntity(huespedWrapper.getD(), helper);
    return ResponseEntity.ok(huespedService.modificarHuesped(huesped));
  }

  @PostMapping("/listarByDate")
  public ResponseEntity<HuespedResponse> huespedListarPorFecha(
      @RequestBody(required = false) HuespedListByDateFilter huesped) {
    return ResponseEntity.ok(huespedService.listarHuespedByDate(huesped));
  }
}
