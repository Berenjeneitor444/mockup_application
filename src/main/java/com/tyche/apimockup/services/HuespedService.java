package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.Huesped;
import com.tyche.apimockup.entities.responses.HuespedResponse;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.utils.ValidationTool;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HuespedService {
    private final HuespedRepository huespedRepository;
    private final ValidationTool validationTool;

    public HuespedService(HuespedRepository huespedRepository, ValidationTool validationTool) {
        this.huespedRepository = huespedRepository;
        this.validationTool = validationTool;
    }

    public HuespedResponse listarHuesped(Map<String, Object> huesped) {
        validationTool.limpiarMapaFiltrado(huesped);
        //TODO logica llamar repo
        return null;
    }

    public HuespedResponse crearHuesped(Huesped huesped) {
        String[] errores = validationTool.validarEntidad(huesped);
        if (errores.length == 0) {
            huespedRepository.save(huesped);

            return new HuespedResponse("KO", errores, huesped);
        } else {
            return new HuespedResponse("OK", errores, null);
        }
        return null;
    }
}
