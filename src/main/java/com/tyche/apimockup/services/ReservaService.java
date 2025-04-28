package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.Huesped;
import com.tyche.apimockup.entities.Reserva;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.repositories.ReservaRepository;
import com.tyche.apimockup.utils.ReservaValidationTool;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    private final ReservaValidationTool validationTool;

    public ReservaService(ReservaRepository reservaRepository, ReservaValidationTool validationTool) {
        this.reservaRepository = reservaRepository;
        this.validationTool = validationTool;
    }

    public ReservaResponse listarReserva(Map<String, Object> filtrosSucios) {
            if (filtrosSucios == null || filtrosSucios.isEmpty()) {
                return new ReservaResponse("OK", new String[0], reservaRepository.basicCRUD().findAll());
            }
            Map<String, Object> filtrosLimpios = validationTool.prepararMapaFiltrado(filtrosSucios);
            if (filtrosLimpios.isEmpty()) {
                return new ReservaResponse("OK", new String[0], reservaRepository.basicCRUD().findAll());
            }
            List<Reserva> listaReservas = reservaRepository.findByFilters(filtrosLimpios);
            if (listaReservas.isEmpty()) {
                return new ReservaResponse("KO", new String[]{"No se han encontrado reservas con los filtros solicitados"}, null);
            } else {
                return new ReservaResponse("OK", new String[0], listaReservas);
            }
    }

    public ReservaResponse crearReserva(Reserva reserva) {
        String[] errores = validarTotalidad(reserva);
        if (errores.length == 0) {
            reservaRepository.basicCRUD().save(reserva);
            return new ReservaResponse("OK", errores, reserva);
        } else {
            return new ReservaResponse("KO", errores, null);
        }
    }
    private String[] validatePersistencia(Reserva reserva) {
        List<String> errores = new ArrayList<>();
        // comprobar que no exista una reserva con el mismo ReservationNumber
        if (reservaRepository.basicCRUD().findByReservationNumber(reserva.getNumReserva()).isPresent()) {
            errores.add("Ya existe una reserva con el mismo id");
        }
        return errores.toArray(new String[0]);

    }
    private String[] validarTotalidad(Reserva reserva) {
        List<String> errores = new ArrayList<>();
        String[] erroresFormato = validationTool.validarEntidad(reserva);
        String[] erroresPersistencia = validatePersistencia(reserva);
        errores.addAll(Arrays.asList(erroresFormato));
        errores.addAll(Arrays.asList(erroresPersistencia));
        return errores.toArray(new String[0]);
    }
}
