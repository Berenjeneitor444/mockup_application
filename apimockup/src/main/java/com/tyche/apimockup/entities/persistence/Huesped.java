package com.tyche.apimockup.entities.persistence;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "huespedes")
@Data
public class Huesped {

  @Id private String idHuesped = "";

  @Field(value = "hotel")
  private String hotel = "";

  @Field(value = "reservationNumber")
  private String reservationNumber = "";

  @Field(value = "DatosComunicacion")
  private DatosComunicacion datosComunicacion = new DatosComunicacion();

  @Field(value = "HotelFactura")
  private String hotelFactura = "";

  @Field(value = "NumReserva")
  private String numReserva = "";

  @Field(value = "NumeroCliente")
  private String numeroCliente = "";

  @Field(value = "TipoPersona")
  private String tipoPersona = "";

  @Field(value = "Nombre_Pila")
  private String nombrePila = "";

  @Field(value = "Nombre")
  private String nombre = "";

  @Field(value = "Email")
  private String email = "";

  @Field(value = "FechaNacimiento")
  private String fechaNacimiento = "";

  @Field(value = "PaisNacimiento")
  private String paisNacimiento = "";

  @Field(value = "TipoDocumento")
  private String tipoDocumento = "";

  @Field(value = "FechaExpedicion")
  private String fechaExpedicion = "";

  @Field(value = "FechaCaducidad")
  private String fechaCaducidad = "";

  @Field(value = "Edad")
  private String edad = "";

  @Field(value = "IDDocumento")
  private String idDocumento = "";

  @Field(value = "TipoCliente")
  private String tipoCliente = "";

  @Field(value = "Sexo")
  private String sexo = "";

  @Field(value = "AceptaInfo")
  private String aceptaInfo = "";

  @Field(value = "Repetidor")
  private String repetidor = "";

  @Field(value = "Vip")
  private String vip = "";

  @Field(value = "FechaEntrada")
  private String fechaEntrada = "";

  @Field(value = "FechaSalida")
  private String fechaSalida = "";

  @Field(value = "Firma")
  private String firma = "";
}
