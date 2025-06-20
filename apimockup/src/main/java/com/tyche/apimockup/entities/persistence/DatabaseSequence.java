package com.tyche.apimockup.entities.persistence;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sequences")
@Data
public class DatabaseSequence {
  @Id private String id;

  @Field("seq")
  private long seq = 1L;
}
