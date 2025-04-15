package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.Huesped;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HuespedRepository extends MongoRepository<Huesped, String> {
}
