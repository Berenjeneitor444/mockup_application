package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.Entidad;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;

@Repository
abstract class BaseRepository<T extends Entidad> {
    private final MongoTemplate mongoTemplate;
    protected BaseRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    protected abstract Class<T> getEntityClass();

    public List<T> findByFilters(Map<String, Object> filters) {
        Query query = new Query();
        filters.forEach((key, value) -> query.addCriteria(Criteria.where(key).is(value)));
        return mongoTemplate.find(query, getEntityClass());
    }
}
