package com.tyche.apimockup.services;

import com.tyche.apimockup.repositories.DatabaseSequenceRepository;
import com.tyche.apimockup.repositories.HuespedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSequenceService {
  @Autowired private DatabaseSequenceRepository databaseSequenceRepository;
  @Autowired private HuespedRepository huespedRepository;

  public long generateSequence(String sequenceName) {
    long id;
    do {
      id = databaseSequenceRepository.generateSequence(sequenceName);
    } while (huespedRepository.basicCRUD().findById(String.format("%010d", id)).isPresent());
    return id;
  }

  public void rollbackSequence(String sequenceName) {
    databaseSequenceRepository.rollbackIncrement(sequenceName);
  }
}
