package com.tyche.apimockup.controllers;

import com.tyche.apimockup.entities.responses.DocumentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aws")
public class DocumentController {
  @PostMapping("/uploadDocument")
  public ResponseEntity<DocumentResponse> uploadDocument() {
    return ResponseEntity.ok(new DocumentResponse("OK", ""));
  }
}
