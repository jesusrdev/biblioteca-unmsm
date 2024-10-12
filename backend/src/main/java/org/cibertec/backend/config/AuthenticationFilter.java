package org.cibertec.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.cibertec.backend.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    public AuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Get token from the Authorization header
        String jws = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (jws != null && jws.startsWith("Bearer ")) {

            // Remove Bearer from the token
            jws= jws.substring(7);

            // Verify the token and get user
            String user = jwtService.getAuthUser(request);

            // Get authorities from token
            List<GrantedAuthority> authorities = jwtService.getAuthorities(jws);

            // Authenticate
//            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
//                    java.util.Collections.emptyList());
//            SecurityContextHolder.getContext().setAuthentication(authentication);
            if (user != null) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}