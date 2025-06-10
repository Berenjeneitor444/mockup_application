package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Huesped;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HuespedBasicCRUD extends MongoRepository<Huesped, String> {}
