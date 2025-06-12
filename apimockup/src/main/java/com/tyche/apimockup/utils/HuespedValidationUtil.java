package com.tyche.apimockup.utils;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.repositories.DatabaseSequenceRepository;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class HuespedValidationUtil extends BaseValidationUtil<Huesped> {

    private final HuespedRepository repository;
    private final DatabaseSequenceRepository databaseSequenceRepository;

    public HuespedValidationUtil(HuespedRepository repository, DatabaseSequenceRepository databaseSequenceRepository) {
        this.repository = repository;
        this.databaseSequenceRepository = databaseSequenceRepository;
    }

    @Override
    public String[] validarTotalidad(Huesped huesped, boolean isCreate){
        String[] errores = super.validarTotalidad(huesped, isCreate);
        if (errores.length > 0){
            try {
                databaseSequenceRepository.rollbackIncrement("huespedes");
            }
            catch(IllegalStateException e){
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
        if (!isCreate) {
            if (idHuesped == null || idHuesped.isEmpty()) {
                errores.add("El ID del huesped no puede estar vacío");
            } else if (!(idHuesped.matches("^\\d{10}$"))) {
                errores.add("ID del huesped no es válido");
            }
        } else {
            if (!idHuesped.isEmpty()) {
                errores.add("No se puede dar de alta a un huésped si tiene un id asignado");
            }
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
        if (isCreate) huesped.setIdHuesped(String.format("%010d", databaseSequenceRepository.generateSequence("huespedes")));
        // comprobar que no exista un huesped con el mismo id
        Optional<Huesped> huespedExistente = repository.basicCRUD().findById(huesped.getIdHuesped());
        if (huespedExistente.isPresent()) {
            if (isCreate) {
                errores.add("Ya existe un huesped con el mismo id");
            }
            // si la modificacion cambia algo metemos la firma
            else {
                if (!huespedExistente.get().equals(huesped)) {
                    huesped.setFirma("X");
                }
                // no permitimos que se cambie el numero de reserva al que pertenece el huesped
                huesped.setReservationNumber(huespedExistente.get().getReservationNumber());
                // ajustamos este campo con el valor correcto
                huesped.setNumReserva(huesped.getReservationNumber());
            }
        } else if (!isCreate) {
            errores.add("El Huesped que quieres reemplazar no existe");
        }


        // comprobar que exista una reserva con el mismo NumeroReserva
        if (!(repository.reservaExists(huesped.getReservationNumber()))) {
            errores.add("No existe una reserva con el mismo id");
        } else if (!(repository.hotelIsCorrect(huesped.getReservationNumber(), huesped.getHotel())))
            errores.add("El hotel no coincide con el de la reserva");
        return errores;
    }

}
