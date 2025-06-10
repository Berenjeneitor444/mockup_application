package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Huesped;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HuespedRepository extends BaseRepository<Huesped> {
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

    public boolean reservaExists(String id) {
        return reservaBasicCRUD.findById(id).isPresent();
    }
}
