package com.tyche.apimockup.services;

import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.entities.filter.ReservaFilter;
import com.tyche.apimockup.entities.responses.ReservaResponse;
import com.tyche.apimockup.repositories.ReservaRepository;
import com.tyche.apimockup.utils.ReservaValidationUtil;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    private final ReservaValidationUtil validationUtil;

    public ReservaService(ReservaRepository reservaRepository, ReservaValidationUtil validationUtil) {
        this.reservaRepository = reservaRepository;
        this.validationUtil = validationUtil;
    }

    public ReservaResponse listarReserva(ReservaFilter filtros) {
            if (filtros == null || (filtros.getHotel() == null && filtros.getReservationNumber() == null)) {
                return new ReservaResponse("KO", new String[]{"Es obligatorio indicar el hotel o el número de reserva"}, null);
            }
            List<Reserva> listaReservas = reservaRepository.findByFilters(filtros);
            if (listaReservas.isEmpty()) {
                return new ReservaResponse("KO", new String[]{"No se han encontrado reservas con los filtros solicitados"}, null);
            } else {
                return new ReservaResponse("OK", new String[0], listaReservas);
            }
    }

    public ReservaResponse crearReserva(Reserva reserva) {
        if (reserva == null) {
            return new ReservaResponse("KO", new String[]{"Es obligatorio proporcionar la reserva"}, null);
        }
        String[] errores = validationUtil.validarTotalidad(reserva, true);
        if (errores.length == 0) {
            reservaRepository.basicCRUD().save(reserva);
            return new ReservaResponse("OK", errores, reserva);
        } else {
            return new ReservaResponse("KO", errores, null);
        }
    }
    public ReservaResponse modificarReserva(Reserva reserva) {
        if (reserva == null) {
            return new ReservaResponse("KO", new String[]{"Es obligatorio proporcionar la reserva"}, null);
        }
        String[] errores = validationUtil.validarTotalidad(reserva, false);
        if (errores.length == 0) {
            reservaRepository.basicCRUD().save(reserva);
            return new ReservaResponse("OK", errores, reserva);
        } else {
            return new ReservaResponse("KO", errores, null);
        }
    }
}
