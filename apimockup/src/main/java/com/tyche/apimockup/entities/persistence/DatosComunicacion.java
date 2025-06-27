package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class DatosComunicacion implements Entity {

  @Field(value = "Descripcion")
  private String descripcion;

  @Field(value = "Direccion")
  private String direccion;

  @Field(value = "CodigoPostal")
  private String codigoPostal;

  @Field(value = "Poblacion")
  private String poblacion;

  @Field(value = "Provincia")
  private String provincia;

  @Field(value = "ComunidadAutonoma")
  private String comunidadAutonoma;

  @Field(value = "Pais")
  private String pais;

  @Field(value = "ApartadoCorreos")
  private String apartadoCorreos;

  @Field(value = "Telefono")
  private String telefono;

  @Field(value = "TelefonoMovil")
  private String telefonoMovil;

  @Field(value = "FaxNumber")
  private String faxNumber;

  @Field(value = "EMail")
  private String email;

  @Transient
  public static final Map<String, String> FIELD_MAP =
      Map.ofEntries(
          Map.entry("descripcion", "Descripcion"),
          Map.entry("direccion", "Direccion"),
          Map.entry("codigoPostal", "CodigoPostal"),
          Map.entry("poblacion", "Poblacion"),
          Map.entry("provincia", "Provincia"),
          Map.entry("comunidadAutonoma", "ComunidadAutonoma"),
          Map.entry("pais", "Pais"),
          Map.entry("apartadoCorreos", "ApartadoCorreos"),
          Map.entry("telefono", "Telefono"),
          Map.entry("telefonoMovil", "TelefonoMovil"),
          Map.entry("faxNumber", "FaxNumber"),
          Map.entry("email", "EMail"));

  @Override
  public Map<String, Object> toMap(ObjectMapper objectMapper) {
    return objectMapper
        .convertValue(this, new TypeReference<Map<String, Object>>() {})
        .entrySet()
        .stream()
        .filter(e -> e.getValue() != null)
        .collect(Collectors.toMap(e -> getMongoField(e.getKey(), FIELD_MAP), Map.Entry::getValue));
  }
}
