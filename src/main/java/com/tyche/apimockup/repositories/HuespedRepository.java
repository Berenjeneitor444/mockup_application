package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.Huesped;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class HuespedRepository extends BaseRepository<Huesped> {
    private final HuespedBasicCRUD huespedBasicCRUD;

    protected HuespedRepository(MongoTemplate mongoTemplate, HuespedBasicCRUD huespedBasicCRUD) {
        super(mongoTemplate);
        this.huespedBasicCRUD = huespedBasicCRUD;
    }

    @Override
    protected Class<Huesped> getEntityClass() {
        return Huesped.class;
    }

    public HuespedBasicCRUD basicCRUD() {
        return huespedBasicCRUD;
    }
}
