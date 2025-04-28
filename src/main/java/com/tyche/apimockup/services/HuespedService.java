package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.Huesped;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.repositories.ReservaRepository;
import com.tyche.apimockup.utils.HuespedValidationTool;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HuespedService {
    private final HuespedRepository huespedRepository;
    private final ReservaRepository reservaRepository;
    private final HuespedValidationTool validationTool;

    public HuespedService(HuespedRepository huespedRepository, ReservaRepository reservaRepository, HuespedValidationTool validationTool) {
        this.huespedRepository = huespedRepository;
        this.reservaRepository = reservaRepository;
        this.validationTool = validationTool;
    }

    public HuespedResponse listarHuesped(Map<String, Object> filtrosSucios) {
        if (filtrosSucios == null || filtrosSucios.isEmpty()) {
            return new HuespedResponse("OK", new String[0], huespedRepository.basicCRUD().findAll());
        }
        Map<String, Object> filtrosLimpios = validationTool.prepararMapaFiltrado(filtrosSucios);

        if (filtrosLimpios.isEmpty()) {
            return new HuespedResponse("OK", new String[0], huespedRepository.basicCRUD().findAll());
        }
        List<Huesped> listaHuespedes = huespedRepository.findByFilters(filtrosLimpios);
        if (listaHuespedes.isEmpty()) {
            return new HuespedResponse("KO", new String[]{"No se han encontrado huespedes con los filtros solicitados"}, null);
        } else {
            return new HuespedResponse("OK", new String[0], listaHuespedes);
        }
    }

    public HuespedResponse crearHuesped(Huesped huesped) {
        // validar que el huesped sea valido en persistencia y en formato
        String[] errores = validarTotalidad(huesped);

        if (errores.length == 0) {
            huespedRepository.basicCRUD().save(huesped);
            return new HuespedResponse("OK", errores, huesped);
        } else {
            return new HuespedResponse("KO", errores, null);
        }
    }
    private String[] validatePersistencia(Huesped huesped) {
        List<String> errores = new ArrayList<>();
        // comprobar que no exista un huesped con el mismo id
        if (huespedRepository.basicCRUD().findByidHuesped(huesped.getIdHuesped()).isPresent()) {
            errores.add("Ya existe un huesped con el mismo id");
        }
        // comprobar que exista una reserva con el mismo NumeroReserva

        if (reservaRepository.basicCRUD().findByReservationNumber(huesped.getReservationNumber()).isEmpty()) {
            errores.add("No existe una reserva con el mismo id");
        }
        return errores.toArray(new String[0]);

    }
    private String[] validarTotalidad(Huesped huesped) {
        List<String> errores = new ArrayList<>();
        String[] erroresFormato = validationTool.validarEntidad(huesped);
        String[] erroresPersistencia = validatePersistencia(huesped);
        errores.addAll(Arrays.asList(erroresFormato));
        errores.addAll(Arrays.asList(erroresPersistencia));
        return errores.toArray(new String[0]);
    }
}
