package com.tyche.apimockup.entities.persistence;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;




@Document(collection = "huespedes")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Huesped {

    @JsonView(Vista.Crear.class)
    @JsonProperty("IDHuesped")
    @Id
    private String idHuesped = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("hotel")
    @Field(value = "hotel")
    private String hotel = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("reservationNumber")
    @Field(value = "reservationNumber")
    private String reservationNumber = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("DatosComunicacion")
    @Field(value = "DatosComunicacion")
    private DatosComunicacion datosComunicacion = new DatosComunicacion();

    @JsonView(Vista.Crear.class)
    @JsonProperty("HotelFactura")
    @Field(value = "HotelFactura")
    private String hotelFactura = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("NumReserva")
    @Field(value = "NumReserva")
    private String numReserva = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("NumeroCliente")
    @Field(value = "NumeroCliente")
    private String numeroCliente = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("TipoPersona")
    @Field(value = "TipoPersona")
    private String tipoPersona = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Nombre_Pila")
    @Field(value = "Nombre_Pila")
    private String nombrePila = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Nombre")
    @Field(value = "Nombre")
    private String nombre = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Email")
    @Field(value = "Email")
    private String email = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("FechaNacimiento")
    @Field(value = "FechaNacimiento")
    private String fechaNacimiento = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("PaisNacimiento")
    @Field(value = "PaisNacimiento")
    private String paisNacimiento = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("TipoDocumento")
    @Field(value = "TipoDocumento")
    private String tipoDocumento = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("FechaExpedicion")
    @Field(value = "FechaExpedicion")
    private String fechaExpedicion = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("FechaCaducidad")
    @Field(value = "FechaCaducidad")
    private String fechaCaducidad = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Edad")
    @Field(value = "Edad")
    private String edad = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("IDDocumento")
    @Field(value = "IDDocumento")
    private String idDocumento = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("TipoCliente")
    @Field(value = "TipoCliente")
    private String tipoCliente = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Sexo")
    @Field(value = "Sexo")
    private String sexo = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("AceptaInfo")
    @Field(value = "AceptaInfo")
    private String aceptaInfo = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Repetidor")
    @Field(value = "Repetidor")
    private String repetidor = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("Vip")
    @Field(value = "Vip")
    private String vip = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("FechaEntrada")
    @Field(value = "FechaEntrada")
    private String fechaEntrada = "";

    @JsonView(Vista.Crear.class)
    @JsonProperty("FechaSalida")
    @Field(value = "FechaSalida")
    private String fechaSalida = "";

    @JsonView(Vista.Listar.class)
    @JsonProperty("Firma")
    @Field(value = "Firma")
    private String firma = "";
    // interfaces para hacer que firma solo se muestre cuando tenga que listarse
    public interface Vista{
        interface Crear {}
        interface Listar extends Crear {}
    }
}

