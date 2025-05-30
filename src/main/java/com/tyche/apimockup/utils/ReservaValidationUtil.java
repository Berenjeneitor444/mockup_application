package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.repositories.ReservaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReservaValidationUtil extends BaseValidationUtil<Reserva> {

    private final ReservaRepository repository;

    public ReservaValidationUtil(ReservaRepository repository) {
        this.repository = repository;
    }

    @Override
    protected List<String> validarFormato(Reserva reserva) {
        List<String> errores = new ArrayList<>();
        String hotel = reserva.getHotel();
        String reservationNumber = reserva.getReservationNumber();
        String fechaEntrada = reserva.getFechaEntrada();
        String fechaSalida = reserva.getFechaSalida();


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
        // ajustar campos para que sean iguales
        reserva.setHotelFactura(hotel);
        reserva.setNumReserva(reservationNumber);

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
        return errores;
    }

    @Override
    protected List<String> validarPersistencia(Reserva reserva, boolean isCreate) {
        List<String> errores = new ArrayList<>();
        // comprobar que no exista una reserva con el mismo ReservationNumber
        if (repository.basicCRUD().findById(reserva.getNumReserva()).isPresent()) {
            if (isCreate) {
                errores.add("Ya existe una reserva con el mismo id");
            }
        } else if (!isCreate) {
            errores.add("No existe una reserva con el id proporcionado");
        }
        return errores;
    }
}
