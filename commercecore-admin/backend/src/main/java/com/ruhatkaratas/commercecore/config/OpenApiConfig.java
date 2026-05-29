package com.ruhatkaratas.commercecore.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI commerceCoreOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("CommerceCore Admin API")
                        .version("v1")
                        .description("Business-focused e-commerce admin API for products, customers, orders, stock, and dashboard metrics."));
    }
}
