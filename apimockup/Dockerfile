# Stage 1: Build del jar con Maven Wrapper
FROM maven:3.9.4-eclipse-temurin-17 as build

WORKDIR /app

# Copia pom.xml y carpeta .mvn para descargar dependencias primero (caché de Docker)
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
# Copia código fuente
COPY src src

# Construye el jar, sin tests para acelerar
RUN ./mvnw clean package -DskipTests

# Stage 2: Imagen runtime solo con JRE y jar ya compilado
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copia el jar generado desde el build stage
COPY --from=build /app/target/apimockup-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
