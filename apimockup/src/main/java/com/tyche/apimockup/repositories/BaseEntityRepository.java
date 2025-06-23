package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Entity;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.persistence.Reserva;
import com.tyche.apimockup.entities.requests.filter.Filter;
import com.tyche.apimockup.utils.EntityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
abstract class BaseEntityRepository<T> {
  @Autowired private MongoTemplate mongoTemplate;
  @Autowired private EntityUtil entityUtil;

  protected abstract Class<T> getEntityClass();

  // solo actualiza los campos proporcionados
  public boolean dynamicUpdate(Entity reservaOHuesped) {
    Query query;
    Update update = new Update();
    String id;
    if (reservaOHuesped instanceof Reserva reserva) id = reserva.getReservationNumber();
    else if (reservaOHuesped instanceof Huesped huesped) id = huesped.getIdHuesped();
    else throw new IllegalStateException("Se ha pasado una entidad no valida para actualizar");
    query = new Query(Criteria.where("_id").is(id));
    Map<String, Object> map = entityUtil.toMap(reservaOHuesped);
    map.forEach(update::set);
    // devuelve si ha modificado algo o no
    return mongoTemplate.updateFirst(query, update, getEntityClass()).getModifiedCount() > 0;

  }

  public List<T> findByFilters(Filter filters) {
    Query query = new Query();
    filters
        .toMap()
        .forEach(
            (key, value) -> {
              if (key.equals("IDHuesped") || key.equals("ReservationNumber")) key = "_id";
              query.addCriteria(Criteria.where(key).is(value));
            });
    return mongoTemplate.find(query, getEntityClass());
  }
}
