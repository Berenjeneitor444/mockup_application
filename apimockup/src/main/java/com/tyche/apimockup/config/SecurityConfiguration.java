package com.tyche.apimockup.config;

import jakarta.annotation.PostConstruct;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {
    @Value("${app.security.web_user}")
    private String webUserName;
    @Value("${app.security.web_password}")
    private String webUserPassword;
    @Value("${app.security.api_user}")
    private String apiUserName;
    @Value("${app.security.api_password}")
    private String apiUserPassword;

    @PostConstruct
    public void checkProperties() {
        if (webUserName == null || webUserPassword == null ||
                apiUserName == null || apiUserPassword == null) {
            throw new IllegalStateException("Faltan variables de configuración de usuarios");
        }
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults()) // Usará el CorsConfigurationSource de abajo
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/reserva/crear").hasRole("FORM")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173",
                "https://localhost", "http://localhost:4200"));
        config.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        var webUser = User.builder()
                .username(webUserName)
                .password(encoder.encode(webUserPassword))
                .roles("FORM")
                .build();

        var apiUser = User.builder()
                .username(apiUserName)
                .password(encoder.encode(apiUserPassword))
                .roles("API")
                .build();

        return new InMemoryUserDetailsManager(webUser, apiUser);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
