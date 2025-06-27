package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "huespedes")
@Data
public class Huesped implements Entity {

  @Id private String idHuesped;

  @Field(value = "hotel")
  private String hotel;

  @Field(value = "reservationNumber")
  private String reservationNumber;

  @Field(value = "DatosComunicacion")
  private DatosComunicacion datosComunicacion = new DatosComunicacion();

  @Field(value = "HotelFactura")
  private String hotelFactura;

  @Field(value = "NumReserva")
  private String numReserva;

  @Field(value = "NumeroCliente")
  private String numeroCliente;

  @Field(value = "TipoPersona")
  private String tipoPersona;

  @Field(value = "Nombre_Pila")
  private String nombrePila;

  @Field(value = "Nombre")
  private String nombre;

  @Field(value = "Email")
  private String email;

  @Field(value = "FechaNacimiento")
  private String fechaNacimiento;

  @Field(value = "PaisNacimiento")
  private String paisNacimiento;

  @Field(value = "TipoDocumento")
  private String tipoDocumento;

  @Field(value = "FechaExpedicion")
  private String fechaExpedicion;

  @Field(value = "FechaCaducidad")
  private String fechaCaducidad;

  @Field(value = "Edad")
  private String edad;

  @Field(value = "IDDocumento")
  private String idDocumento;

  @Field(value = "TipoCliente")
  private String tipoCliente;

  @Field(value = "Sexo")
  private String sexo;

  @Field(value = "AceptaInfo")
  private String aceptaInfo;

  @Field(value = "Repetidor")
  private String repetidor;

  @Field(value = "Vip")
  private String vip;

  @Field(value = "FechaEntrada")
  private String fechaEntrada;

  @Field(value = "FechaSalida")
  private String fechaSalida;

  @Field(value = "Firma")
  private String firma = "";

  @Transient
  public static final Map<String, String> FIELD_MAP =
      Map.ofEntries(
          Map.entry("idHuesped", "_id"),
          Map.entry("hotel", "hotel"),
          Map.entry("reservationNumber", "reservationNumber"),
          Map.entry("datosComunicacion", "DatosComunicacion"),
          Map.entry("hotelFactura", "HotelFactura"),
          Map.entry("numReserva", "NumReserva"),
          Map.entry("numeroCliente", "NumeroCliente"),
          Map.entry("tipoPersona", "TipoPersona"),
          Map.entry("nombrePila", "Nombre_Pila"),
          Map.entry("nombre", "Nombre"),
          Map.entry("email", "Email"),
          Map.entry("fechaNacimiento", "FechaNacimiento"),
          Map.entry("paisNacimiento", "PaisNacimiento"),
          Map.entry("tipoDocumento", "TipoDocumento"),
          Map.entry("fechaExpedicion", "FechaExpedicion"),
          Map.entry("fechaCaducidad", "FechaCaducidad"),
          Map.entry("edad", "Edad"),
          Map.entry("idDocumento", "IDDocumento"),
          Map.entry("tipoCliente", "TipoCliente"),
          Map.entry("sexo", "Sexo"),
          Map.entry("aceptaInfo", "AceptaInfo"),
          Map.entry("repetidor", "Repetidor"),
          Map.entry("vip", "Vip"),
          Map.entry("fechaEntrada", "FechaEntrada"),
          Map.entry("fechaSalida", "FechaSalida"),
          Map.entry("firma", "Firma"));

  @Override
  public Map<String, Object> toMap(ObjectMapper objectMapper) {
    return objectMapper
        .convertValue(this, new TypeReference<Map<String, Object>>() {})
        .entrySet()
        .stream()
        .filter(
            e -> e.getValue() != null)
        .collect(
            Collectors.toMap(
                e -> getMongoField(e.getKey(), FIELD_MAP),
                e -> {
                  if (e.getKey().equals("datosComunicacion")) {
                    return this.datosComunicacion.toMap(objectMapper);
                  }
                  return e.getValue();
                }));
  }
}
