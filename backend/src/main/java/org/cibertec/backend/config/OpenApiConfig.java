package org.cibertec.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI medicalAppointmentManagementOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gestión de citas médicas REST API")
                        .description("Backend para gestionar las citas médicas para la Liga Contra el Cáncer")
                        .version("0.1.0"));
    }
}
