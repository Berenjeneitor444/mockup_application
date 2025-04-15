package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.Reserva;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservaRepository extends MongoRepository<Reserva, String> {
}
