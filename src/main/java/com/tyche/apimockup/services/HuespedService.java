package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.filter.HuespedFilter;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.utils.HuespedValidationUtil;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HuespedService {
    private final HuespedRepository huespedRepository;
    private final HuespedValidationUtil validationUtil;

    public HuespedService(HuespedRepository huespedRepository, HuespedValidationUtil validationUtil) {
        this.huespedRepository = huespedRepository;
        this.validationUtil = validationUtil;
    }

    public HuespedResponse listarHuesped(HuespedFilter filtros) {
        if (filtros == null || (filtros.getHotel() == null && filtros.getReservationNumber() == null && filtros.getIdHuesped() == null)) {
            return new HuespedResponse("KO", new String[]{"Es obligatorio indicar el hotel, el número de reserva o el ID de Huesped"}, null);
        }

        List<Huesped> listaHuespedes = huespedRepository.findByFilters(filtros);
        if (listaHuespedes.isEmpty()) {
            return new HuespedResponse("KO", new String[]{"No se han encontrado huespedes con los filtros solicitados"}, null);
        } else {
            return new HuespedResponse("OK", new String[0], listaHuespedes);
        }
    }

    public HuespedResponse crearHuesped(Huesped huesped) {
        if (huesped == null) {
            return new HuespedResponse("KO", new String[]{"Es obligatorio proporcionar el huesped"}, null);
        }
        // validar que el huesped sea valido en persistencia y en formato
        String[] errores = validationUtil.validarTotalidad(huesped, true);

        if (errores.length == 0) {
            huespedRepository.basicCRUD().save(huesped);
            return new HuespedResponse("OK", errores, huesped);
        } else {
            return new HuespedResponse("KO", errores, null);
        }
    }

    public HuespedResponse modificarHuesped(Huesped huesped) {
        if (huesped == null) {
            return new HuespedResponse("KO", new String[]{"Es obligatorio proporcionar el huesped"}, null);
        }
        // validar que el huesped sea valido en persistencia y en formato
        String[] errores = validationUtil.validarTotalidad(huesped, false);
        if (errores.length == 0) {
            // agregamos firma al huesped
            huesped.setFirma("X");
            huespedRepository.basicCRUD().save(huesped);
            return new HuespedResponse("OK", errores, huesped);
        } else {
            return new HuespedResponse("KO", errores, null);
        }
    }
}
