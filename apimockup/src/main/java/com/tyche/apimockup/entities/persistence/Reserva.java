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

@Document(collection = "reservas")
@Data
public class Reserva implements Entity {

  @Transient
  public static final Map<String, String> FIELD_MAP =
      Map.ofEntries(
          Map.entry("reservationNumber", "_id"),
          Map.entry("hotel", "hotel"),
          Map.entry("checkoutRealized", "checkoutRealized"),
          Map.entry("checkIn", "CheckIn"),
          Map.entry("localizador", "Localizador"),
          Map.entry("hotelFactura", "HotelFactura"),
          Map.entry("numReserva", "NumReserva"),
          Map.entry("bono", "Bono"),
          Map.entry("estado", "Estado"),
          Map.entry("habitacion", "Habitacion"),
          Map.entry("thDescripcion", "THDescripcion"),
          Map.entry("thUso", "THUso"),
          Map.entry("seccion", "Seccion"),
          Map.entry("tarifa", "Tarifa"),
          Map.entry("ad", "AD"),
          Map.entry("ni", "NI"),
          Map.entry("jr", "JR"),
          Map.entry("cu", "CU"),
          Map.entry("preCheckIn", "PreCheckIn"),
          Map.entry("fechaEntrada", "FechaEntrada"),
          Map.entry("fechaSalida", "FechaSalida"),
          Map.entry("motivoViaje", "MotivoViaje"),
          Map.entry("llegadaHora", "LlegadaHora"),
          Map.entry("thFactura", "THFactura"),
          Map.entry("bienvenida", "Bienvenida"),
          Map.entry("fechaBienv", "FechaBienv"),
          Map.entry("horaBienv", "HoraBienv"));

  @Id private String reservationNumber;

  @Field(value = "hotel")
  private String hotel;

  @Field(value = "checkoutRealized")
  private Boolean checkoutRealized;

  @Field(value = "CheckIn")
  private String checkIn;

  @Field(value = "Localizador")
  private String localizador;

  @Field(value = "HotelFactura")
  private String hotelFactura;

  @Field(value = "NumReserva")
  private String numReserva;

  @Field(value = "Bono")
  private String bono;

  @Field(value = "Estado")
  private Integer estado;

  @Field(value = "Habitacion")
  private String habitacion;

  @Field(value = "THDescripcion")
  private String thDescripcion;

  @Field(value = "THUso")
  private String thUso;

  @Field(value = "Seccion")
  private String seccion;

  @Field(value = "Tarifa")
  private String tarifa;

  @Field(value = "AD")
  private Integer ad;

  @Field(value = "NI")
  private Integer ni;

  @Field(value = "JR")
  private Integer jr;

  @Field(value = "CU")
  private Integer cu;

  @Field(value = "PreCheckIn")
  private String preCheckIn;

  @Field(value = "FechaEntrada")
  private String fechaEntrada;

  @Field(value = "FechaSalida")
  private String fechaSalida;

  @Field(value = "MotivoViaje")
  private String motivoViaje;

  @Field(value = "LlegadaHora")
  private String llegadaHora;

  @Field(value = "THFactura")
  private String thFactura;

  @Field(value = "Bienvenida")
  private String bienvenida;

  @Field(value = "FechaBienv")
  private String fechaBienv;

  @Field(value = "HoraBienv")
  private String horaBienv;

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
