package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Reserva;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReservaRepository extends BaseEntityRepository<Reserva> {
  private final ReservaBasicCRUD reservaBasicCRUD;

  protected ReservaRepository(MongoTemplate mongoTemplate, ReservaBasicCRUD reservaBasicCRUD) {
    super(mongoTemplate);
    this.reservaBasicCRUD = reservaBasicCRUD;
  }

  @Override
  protected Class<Reserva> getEntityClass() {
    return Reserva.class;
  }

  public ReservaBasicCRUD basicCRUD() {
    return reservaBasicCRUD;
  }
}
