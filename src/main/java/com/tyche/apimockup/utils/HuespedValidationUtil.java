package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HuespedValidationUtil extends BaseValidationUtil<Huesped> {

    private final HuespedRepository repository;

    public HuespedValidationUtil(HuespedRepository repository) {
        this.repository = repository;
    }

    @Override
    protected List<String> validarFormato(Huesped huesped) {
        List<String> errores = new ArrayList<>();
        String idHuesped = huesped.getIdHuesped();
        String hotel = huesped.getHotel();
        String reservationNumber = huesped.getReservationNumber();
        String fechaEntrada = huesped.getFechaEntrada();
        String fechaSalida = huesped.getFechaSalida();

        if (idHuesped == null || idHuesped.isEmpty()) {
            errores.add("El ID del huesped no puede estar vacío");
        } else if (!(idHuesped.matches("^\\d{10}$"))) {
            errores.add("ID del huesped no es válido");
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

        // ajustar campos para que sean iguales
        huesped.setHotelFactura(hotel);
        huesped.setNumReserva(reservationNumber);

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
    protected List<String> validarPersistencia(Huesped huesped, boolean isCreate) {
        List<String> errores = new ArrayList<>();
        // comprobar que no exista un huesped con el mismo id
        if (repository.basicCRUD().findById(huesped.getIdHuesped()).isPresent()) {
            if (isCreate) {
                errores.add("Ya existe un huesped con el mismo id");
            }
        } else if (!isCreate) {
            errores.add("El Huesped que quieres reemplazar no existe");
        }


        // comprobar que exista una reserva con el mismo NumeroReserva
        if (!(repository.reservaExists(huesped.getReservationNumber()))) {
            errores.add("No existe una reserva con el mismo id");
        }
        return errores;
    }

}
