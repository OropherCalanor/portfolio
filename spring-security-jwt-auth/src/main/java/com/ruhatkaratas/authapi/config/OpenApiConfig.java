package com.ruhatkaratas.authapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI authApiOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Spring Security JWT Auth API")
                .description("Authentication and authorization API built with Spring Boot, Spring Security, JWT, and PostgreSQL.")
                .version("v1.0.0")
                .contact(new Contact()
                        .name("Bulent Ruhat Karatas")
                        .url("https://github.com/OropherCalanor"))
                .license(new License()
                        .name("MIT")));
    }
}
