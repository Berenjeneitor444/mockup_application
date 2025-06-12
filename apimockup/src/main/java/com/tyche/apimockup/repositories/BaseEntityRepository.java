package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.filter.Filter;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
abstract class BaseEntityRepository<T> {
    private final MongoTemplate mongoTemplate;

    protected BaseEntityRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    protected abstract Class<T> getEntityClass();

    public List<T> findByFilters(Filter filters) {
        Query query = new Query();
        filters.toMap().forEach((key, value) -> {
            if(key.equals("IDHuesped") || key.equals("ReservationNumber")) key = "_id";
            query.addCriteria(Criteria.where(key).is(value));
        });
        return mongoTemplate.find(query, getEntityClass());
    }
}
