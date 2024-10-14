package org.cibertec.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.cibertec.backend.models.AccountCredentials;
import org.cibertec.backend.models.RoleEnum;
import org.cibertec.backend.models.UserModel;
import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.cibertec.backend.repositories.UserRepository;
import org.cibertec.backend.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PersonalInfoRepository personalInfoRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(
                credentials.code(),
                credentials.password()
        );
        Authentication auth = authenticationManager.authenticate(creds);

        // Extract roles from the authenticated user
        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        // Generate token
        String jwts = jwtService.getToken(auth.getName(), roles);

        // Build response with the generated token
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .body(roles)
//                .build()
                ;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AccountCredentials credentials) {
        var personalInfo = personalInfoRepository.findByCode(credentials.code());

        if (personalInfo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Código de estudiante no encontrado");
        }

        var user = userRepository.findByInfoId(personalInfo.get().getInfoId());

        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Estudiante ya registrado");
        } else {
            var newUser = new UserModel();
            newUser.setPassword(passwordEncoder.encode(credentials.password()));
            newUser.setRole(RoleEnum.USER);
            newUser.setCreationDate(new Date());
            newUser.setInfoId(personalInfo.get().getInfoId());
            userRepository.save(newUser);
            return ResponseEntity.ok().build();
        }
    }
}
