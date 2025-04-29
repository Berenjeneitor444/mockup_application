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
        if (filtros == null || filtros.isEmpty()) {
            return new HuespedResponse("OK", new String[0], huespedRepository.basicCRUD().findAll());
        }

        List<Huesped> listaHuespedes = huespedRepository.findByFilters(filtros);
        if (listaHuespedes.isEmpty()) {
            return new HuespedResponse("KO", new String[]{"No se han encontrado huespedes con los filtros solicitados"}, null);
        } else {
            return new HuespedResponse("OK", new String[0], listaHuespedes);
        }
    }

    public HuespedResponse crearHuesped(Huesped huesped) {
        // validar que el huesped sea valido en persistencia y en formato
        String[] errores = validationUtil.validarTotalidad(huesped);

        if (errores.length == 0) {
            huespedRepository.basicCRUD().save(huesped);
            return new HuespedResponse("OK", errores, huesped);
        } else {
            return new HuespedResponse("KO", errores, null);
        }
    }
}
