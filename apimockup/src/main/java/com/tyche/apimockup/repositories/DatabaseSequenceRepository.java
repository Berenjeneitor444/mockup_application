package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class DatabaseSequenceRepository {
  @Autowired private MongoTemplate mongoTemplate;

  public long generateSequence(String sequenceName) {
    Query query = new Query(Criteria.where("_id").is(sequenceName));
    Update update = new Update().inc("seq", 1L);
    FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);
    DatabaseSequence counter =
        mongoTemplate.findAndModify(query, update, options, DatabaseSequence.class);
    if (counter == null)
      throw new IllegalStateException(
          "No se pudo generar la secuencia para '" + sequenceName + "'");
    if (counter.getSeq() > 9999999999L) setSequence(sequenceName);
    return counter.getSeq();
  }

  public void rollbackIncrement(String sequenceName) {
    Query query = new Query(Criteria.where("_id").is(sequenceName).and("seq").gt(0L));
    Update update = new Update().inc("seq", -1L);
    FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(false);
    DatabaseSequence counter =
        mongoTemplate.findAndModify(query, update, options, DatabaseSequence.class);
    if (counter == null)
      throw new IllegalStateException(
          "No se pudo revertir el incremento de la secuencia '" + sequenceName + "'.");
  }

  private void setSequence(String sequenceName) {
    Query query = new Query(Criteria.where("_id").is(sequenceName));
    Update update = new Update().set("seq", 1L);
    mongoTemplate.updateFirst(query, update, DatabaseSequence.class);
  }
}
