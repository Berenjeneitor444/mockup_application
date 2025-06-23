package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.services.DatabaseSequenceService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class HuespedValidationUtil extends BaseValidationUtil<Huesped> {

  private final HuespedRepository repository;
  private final DatabaseSequenceService databaseSequenceService;

  public HuespedValidationUtil(
      HuespedRepository repository, DatabaseSequenceService databaseSequenceService) {
    this.repository = repository;
    this.databaseSequenceService = databaseSequenceService;
  }

  @Override
  public String[] validarTotalidad(Huesped huesped, boolean isCreate) {
    // si estamos creando creo la pk y la asigno al principio
    if (isCreate)
      huesped.setIdHuesped(
          String.format("%010d", databaseSequenceService.generateSequence("huespedes")));
    String[] errores = super.validarTotalidad(huesped, isCreate);
    if (errores.length > 0 && isCreate) {
      // si algo sale mal hago rollback para dejar la secuencia como antes
      try {
        databaseSequenceService.rollbackSequence("huespedes");
      } catch (IllegalStateException e) {
        System.err.println(e.getMessage());
      }
    }
    return errores;
  }

  @Override
  protected List<String> validarFormato(Huesped huesped, boolean isCreate) {
    List<String> errores = new ArrayList<>();
    String idHuesped = huesped.getIdHuesped();
    String hotel = huesped.getHotel();
    String reservationNumber = huesped.getReservationNumber();
    String fechaEntrada = huesped.getFechaEntrada();
    String fechaSalida = huesped.getFechaSalida();
    if (!isCreate) { // solo al editar
      if (idHuesped == null || idHuesped.isEmpty()) {
        errores.add("El ID del huesped no puede estar vacío");
      } else if (!(idHuesped.matches("^\\d{10}$"))) {
        errores.add("ID del huesped no es válido");
      }
    } else { // solo al crear
      if (!idHuesped.isEmpty()) {
        errores.add("No se puede dar de alta a un huésped si tiene un id asignado");
      }

      if (hotel == null || hotel.isEmpty()) {
        errores.add("El hotel no puede estar vacío");
      } else if (!(hotel.matches("^M[1-4]$"))) {
        errores.add("El hotel no es válido");
      }
      if (reservationNumber == null || reservationNumber.isEmpty()) {
        errores.add("El número de reserva no puede estar vacío");
      } else if (!(reservationNumber.matches("^\\d{10}$"))) {
        errores.add("El número de reserva no es válido");
      }
    }

    // Comun para los dos casos
    if (fechaEntrada != null && !fechaEntrada.isEmpty()) {
      if (!esFechaValida(fechaEntrada)) {
        errores.add("La fecha de entrada no es válida");
      }
    }

    if (fechaSalida != null && !fechaSalida.isEmpty()) {
      if (!esFechaValida(fechaSalida)) {
        errores.add("La fecha de salida no es válida");
      }
    }

    // ajustar campos para que sean iguales
    huesped.setHotelFactura(hotel);
    huesped.setNumReserva(reservationNumber);
    return errores;
  }

  @Override
  protected List<String> validarPersistencia(Huesped huesped, boolean isCreate) {
    List<String> errores = new ArrayList<>();
    // comprobar que no exista un huesped con el mismo id
    Optional<Huesped> huespedExistente = repository.basicCRUD().findById(huesped.getIdHuesped());
    if (huespedExistente.isPresent()) {
      if (isCreate) {
        errores.add("Ya existe un huesped con el mismo id");
      }
    } else if (!isCreate) {
      errores.add("El Huesped que quieres reemplazar no existe");
    }
    // comprobar que exista una reserva con el mismo NumeroReserva y que coincida el hotel
    // no lo hago si estoy editando ya que imposibilito el cambiar el reservationNumber o el hotel
    if (isCreate) {
      if (!(repository.reservaExists(huesped.getReservationNumber()))) {
        errores.add("No existe una reserva con el mismo id");
      } else if (!(repository.hotelIsCorrect(huesped.getReservationNumber(), huesped.getHotel())))
        errores.add("El hotel no coincide con el de la reserva");
    }
    return errores;
  }
}
