package com.senac.stockpro.backstockpro.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenApi(){
        return new OpenAPI().info(new Info()
                .title("StockPro")
                .version("1.0")
                .description("Api responsável pelo controle de estoque")
                .termsOfService("https://github.com/Leonardo-Romancini")
        );
    }

}
