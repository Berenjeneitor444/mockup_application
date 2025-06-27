package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Entity;
import com.tyche.apimockup.entities.persistence.Huesped;
import com.tyche.apimockup.entities.persistence.Reserva;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class HuespedRepository extends BaseEntityRepository<Huesped> {
  private final HuespedBasicCRUD huespedBasicCRUD;
  private final ReservaBasicCRUD reservaBasicCRUD;
  private final MongoTemplate mongoTemplate;

  protected HuespedRepository(
          MongoTemplate mongoTemplate,
          HuespedBasicCRUD huespedBasicCRUD,
          ReservaBasicCRUD reservaBasicCRUD) {
    super();
    this.huespedBasicCRUD = huespedBasicCRUD;
    this.reservaBasicCRUD = reservaBasicCRUD;
    this.mongoTemplate = mongoTemplate;
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
  public Reserva getReservaFromHuesped(Huesped huesped){
    return reservaBasicCRUD.findById(huesped.getReservationNumber()).orElseThrow();
  }

  public Huesped dynamicUpdate(Huesped huesped) {
    if (super.dynamicUpdate(huesped)) {
      Query query = new Query(Criteria.where("_id").is(huesped.getIdHuesped()));
      Update update = new Update();
      FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true);
      update.set("Firma", "X");
      return mongoTemplate.findAndModify(query, update, options, getEntityClass());
    }
    else return basicCRUD().findById(huesped.getIdHuesped()).orElseThrow();
  }
}
