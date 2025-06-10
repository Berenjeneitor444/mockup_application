package com.tyche.apimockup.repositories;

import com.tyche.apimockup.entities.persistence.Reserva;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservaBasicCRUD extends MongoRepository<Reserva, String> {}
