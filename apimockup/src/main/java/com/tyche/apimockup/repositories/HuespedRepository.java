package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Huesped;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HuespedRepository extends BaseEntityRepository<Huesped> {
    private final HuespedBasicCRUD huespedBasicCRUD;
    private final ReservaBasicCRUD reservaBasicCRUD;

    protected HuespedRepository(MongoTemplate mongoTemplate, HuespedBasicCRUD huespedBasicCRUD,
                                ReservaBasicCRUD reservaBasicCRUD) {
        super(mongoTemplate);
        this.huespedBasicCRUD = huespedBasicCRUD;
        this.reservaBasicCRUD = reservaBasicCRUD;
    }

    @Override
    protected Class<Huesped> getEntityClass() {
        return Huesped.class;
    }

    public HuespedBasicCRUD basicCRUD() {
        return huespedBasicCRUD;
    }

    public boolean reservaExists(String reservationNumber) {
        return reservaBasicCRUD.findById(reservationNumber).isPresent();
    }
    public boolean hotelIsCorrect(String reservationNumber, String hotel) {
        var existingReserva = reservaBasicCRUD.findById(reservationNumber);
        return existingReserva.map(reserva -> reserva.getHotel().equals(hotel)).orElse(false);
    }
}
