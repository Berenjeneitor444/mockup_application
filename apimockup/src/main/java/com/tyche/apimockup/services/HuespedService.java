package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.dtos.output.HuespedOutput;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.requests.filter.HuespedFilter;
import com.tyche.apimockup.entities.requests.filter.HuespedListByDateFilter;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.mappers.HuespedMapper;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.utils.EntityHelper;
import com.tyche.apimockup.utils.HuespedValidationUtil;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class HuespedService {
  private final HuespedRepository huespedRepository;
  private final HuespedValidationUtil validationUtil;
  private final HuespedMapper mapper;
  private final EntityHelper entityHelper;

  public HuespedService(
      HuespedRepository huespedRepository,
      HuespedValidationUtil validationUtil,
      HuespedMapper mapper,
      EntityHelper entityHelper) {
    this.huespedRepository = huespedRepository;
    this.validationUtil = validationUtil;
    this.mapper = mapper;
    this.entityHelper = entityHelper;
  }

  public HuespedResponse listarHuesped(HuespedFilter filtros) {
    if (filtros == null
        || (filtros.getHotel() == null
            && filtros.getReservationNumber() == null
            && filtros.getIdHuesped() == null)) {
      return new HuespedResponse(
          "KO",
          new String[] {"Es obligatorio indicar el hotel, el número de reserva o el ID de Huesped"},
          null);
    }

    List<Huesped> listaHuespedes = huespedRepository.findByFilters(filtros);
    if (listaHuespedes.isEmpty()) {
      return new HuespedResponse(
          "KO", new String[] {"No se han encontrado huespedes con los filtros solicitados"}, null);
    } else {
      List<HuespedOutput> listaHuespedesDTO =
          listaHuespedes.stream().map(huesped -> mapper.toDTO(huesped, entityHelper)).toList();
      return new HuespedResponse("OK", new String[0], listaHuespedesDTO);
    }
  }

  public HuespedResponse listarHuespedByDate(HuespedListByDateFilter filtros) {
    if (filtros == null || (filtros.getHotel() == null && filtros.getFechaEntrada() == null)) {
      return new HuespedResponse(
          "KO", new String[] {"Es obligatorio indicar el hotel y la fecha de entrada"}, null);
    }

    List<Huesped> listaHuespedes = huespedRepository.findByFilters(filtros);
    if (listaHuespedes.isEmpty()) {
      return new HuespedResponse(
          "KO",
          new String[] {"No se han encontrado huespedes con la fecha y hotel solicitados"},
          null);
    } else {
      List<HuespedOutput> listaHuespedesDTO =
          listaHuespedes.stream().map(huesped -> mapper.toDTO(huesped, entityHelper)).toList();
      return new HuespedResponse("OK", new String[0], listaHuespedesDTO);
    }
  }

  public HuespedResponse crearHuesped(Huesped huesped) {
    if (huesped == null) {
      return new HuespedResponse(
          "KO", new String[] {"Es obligatorio proporcionar el huesped"}, null);
    }
    // validar que el huesped sea valido en persistencia y en formato
    String[] errores = validationUtil.validarTotalidad(huesped, true);

    if (errores.length == 0) {
      huespedRepository.basicCRUD().save(huesped);
      return new HuespedResponse("OK", errores, List.of(mapper.toDTO(huesped, entityHelper)));
    } else {

      return new HuespedResponse("KO", errores, null);
    }
  }

  public HuespedResponse modificarHuesped(Huesped huesped) {
    if (huesped == null) {
      return new HuespedResponse(
          "KO", new String[] {"Es obligatorio proporcionar el huesped"}, null);
    }
    // validar que el huesped sea valido en persistencia y en formato
    String[] errores = validationUtil.validarTotalidad(huesped, false);
    if (errores.length == 0) {
      huespedRepository.basicCRUD().save(huesped);
      return new HuespedResponse("OK", errores, List.of(mapper.toDTO(huesped, entityHelper)));
    } else {
      return new HuespedResponse("KO", errores, null);
    }
  }
}
