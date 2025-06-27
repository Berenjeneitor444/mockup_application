package com.tyche.apimockup.controllers;

import org.springframework.dao.DuplicateKeyException;
import com.tyche.apimockup.entities.dtos.input.HuespedCreateDTO;
import com.tyche.apimockup.entities.dtos.input.HuespedUpdateDTO;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.requests.InputDTOWrapper;
import com.tyche.apimockup.entities.requests.filter.HuespedFilter;
import com.tyche.apimockup.entities.requests.filter.HuespedListByDateFilter;
import com.tyche.apimockup.entities.responses.HuespedResponse;

import com.tyche.apimockup.mappers.HuespedMapper;
import com.tyche.apimockup.services.HuespedService;
import com.tyche.apimockup.utils.EntityMapperHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/huespedes")
public class HuespedController {

  private final HuespedService huespedService;
  private final HuespedMapper mapper;
  private final EntityMapperHelper helper;

  public HuespedController(
      HuespedService huespedService, HuespedMapper mapper, EntityMapperHelper helper) {
    this.huespedService = huespedService;
    this.mapper = mapper;
    this.helper = helper;
  }

  @PostMapping("/crear")
  public ResponseEntity<HuespedResponse> huespedCrear(
      @RequestBody(required = false) InputDTOWrapper<HuespedCreateDTO> huespedWrapper) {
    Huesped huesped = mapper.toEntity(huespedWrapper.getD(), helper);
    return ResponseEntity.ok(huespedService.crearHuesped(huesped));
  }

  @ExceptionHandler(DuplicateKeyException.class)
  public ResponseEntity<HuespedResponse> manejarDuplicateKey(DuplicateKeyException e) {
    return ResponseEntity.ok(
            new HuespedResponse(
                "KO",
                new String[] {
                  "Ha habido un problema con la generacion de claves, intentelo de nuevo"
                },
                null));
  }

  @PostMapping("/listar")
  public ResponseEntity<HuespedResponse> huespedListar(
      @RequestBody(required = false) HuespedFilter huesped) {
    return ResponseEntity.ok(huespedService.listarHuesped(huesped));
  }

  @PostMapping("/modificar")
  public ResponseEntity<HuespedResponse> huespedModificar(
      @RequestBody(required = false) InputDTOWrapper<HuespedUpdateDTO> huespedWrapper) {
    Huesped huesped = mapper.toEntity(huespedWrapper.getD());
    return ResponseEntity.ok(huespedService.modificarHuesped(huesped));
  }

  @PostMapping("/listarByDate")
  public ResponseEntity<HuespedResponse> huespedListarPorFecha(
      @RequestBody(required = false) HuespedListByDateFilter huesped) {
    return ResponseEntity.ok(huespedService.listarHuespedByDate(huesped));
  }
}
