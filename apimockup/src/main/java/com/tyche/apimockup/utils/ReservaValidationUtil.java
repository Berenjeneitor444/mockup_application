package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.repositories.ReservaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class ReservaValidationUtil extends BaseValidationUtil<Reserva> {

  private final ReservaRepository repository;

  public ReservaValidationUtil(ReservaRepository repository) {
    this.repository = repository;
  }

  // ahora mismo no se usa este isCreate
  @Override
  protected List<String> validarFormato(Reserva reserva, boolean isCreate) {
    List<String> errores = new ArrayList<>();
    String hotel = reserva.getHotel();
    String reservationNumber = reserva.getReservationNumber();
    String fechaEntrada = reserva.getFechaEntrada();
    String fechaSalida = reserva.getFechaSalida();

    // solo al crear
    if (isCreate) {
      if (hotel == null || hotel.isEmpty()) {
        errores.add("El hotel no puede estar vacío");
      } else if (!(hotel.matches("^M[1-4]$"))) {
        errores.add("El hotel no es válido");
      }
    }
    // para todos los casos
    if (reservationNumber == null || reservationNumber.isEmpty()) {
      errores.add("El número de reserva no puede estar vacío");
    } else if (!(reservationNumber.matches("^\\d{10}$"))) {
      errores.add("El número de reserva no es válido");
    }

    // Validar fechas (si estan presentes)

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
    reserva.setHotelFactura(hotel);
    reserva.setNumReserva(reservationNumber);
    return errores;
  }

  @Override
  protected List<String> validarPersistencia(Reserva reserva, boolean isCreate) {
    List<String> errores = new ArrayList<>();
    // comprobar que no exista una reserva con el mismo ReservationNumber
    Optional<Reserva> existingReserva =
        repository.basicCRUD().findById(reserva.getReservationNumber());
    if (existingReserva.isPresent()) {
      if (isCreate) {
        errores.add("Ya existe una reserva con el mismo id");
      }
    } else if (!isCreate) {
      errores.add("No existe una reserva con el id proporcionado");
    }
    return errores;
  }
}
