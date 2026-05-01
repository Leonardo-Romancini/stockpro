package com.senac.stockpro.backstockpro.infra.config;


import com.senac.stockpro.backstockpro.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        //liberação de métodos para não travar o token JWT
        if(path.equals("/auth/login")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/webjars")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/v3/api-docs")
                || request.getMethod().startsWith("OPTIONS"))
        {
            filterChain.doFilter(request,response);
            return;
        }

        String header = request.getHeader("Authorization");

        if(header != null && header.startsWith("Bearer ")){
            String token = header.replace("Bearer ","");

            //validar token JWT
            var retornoToken = tokenService.validarToken(token);

            var usuarioLogado = retornoToken;

            UsernamePasswordAuthenticationToken usuario = new UsernamePasswordAuthenticationToken(
                    usuarioLogado,
                    null,
                    usuarioLogado.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(usuario);

        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não informado ou inválido");
            return;
        }

        filterChain.doFilter(request,response);
    }
}
