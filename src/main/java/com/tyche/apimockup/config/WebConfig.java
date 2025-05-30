package com.tyche.apimockup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Configuración de CORS
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Aplica a todos los endpoints
                .allowedOrigins("http://localhost:5173")  // Permite que el frontend en ese origen haga peticiones
                .allowedMethods("GET", "POST", "OPTIONS")  // Métodos permitidos
                .allowedHeaders("*");  // Permite todos los encabezados
    }
}
