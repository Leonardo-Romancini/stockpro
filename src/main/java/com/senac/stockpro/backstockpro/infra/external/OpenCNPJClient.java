package com.senac.stockpro.backstockpro.infra.external;

import org.springframework.stereotype.Component;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class OpenCNPJClient {
    private final HttpClient httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

    public boolean cnpjExiste(String cnpj) {
        String cnpjLimpo = cnpj.replaceAll("[^0-9]", "");
        String url = "https://api.opencnpj.org/v1/" + cnpjLimpo; // Ajuste a versão conforme a doc da API

        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());

            return response.statusCode() == 200;
        } catch (Exception e) {
            return false;
        }
    }
}
