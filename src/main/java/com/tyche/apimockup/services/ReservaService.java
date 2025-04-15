package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.Reserva;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.repositories.HuespedRepository;
import com.tyche.apimockup.repositories.ReservaRepository;
import com.tyche.apimockup.utils.ValidationTool;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    private final ValidationTool validationTool;

    public ReservaService(ReservaRepository reservaRepository, ValidationTool validationTool) {
        this.reservaRepository = reservaRepository;
        this.validationTool = validationTool;
    }

    public ReservaResponse listarReserva(Map<String, Object> reserva) {
        validationTool.limpiarMapaFiltrado(reserva);
        //TODO logica llamar repo
        return null;
    }

    public ReservaResponse crearReserva(Reserva reserva) {
        String[] errores = validationTool.validarEntidad(reserva);
        if (errores.length == 0) {
            reservaRepository.save(reserva);
            return new ReservaResponse("OK", errores, reserva);
        } else {
            return new ReservaResponse("KO", errores, null);
        }
    }
}
