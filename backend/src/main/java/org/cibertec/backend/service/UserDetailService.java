package org.cibertec.backend.service;

import org.cibertec.backend.models.PersonalInfo;
import org.cibertec.backend.models.UserModel;
import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.cibertec.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    @Autowired
    private JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String code) throws UsernameNotFoundException {

        // Buscar al personalInfo por su codigo
        PersonalInfo personalInfo = personalInfoRepository.findByCode(code).orElseThrow(() ->
                new UsernameNotFoundException("Código de estudiante no encontrado"));

        // Buscar al user por su infoId
        UserModel userModel = userRepository.findByInfoId(personalInfo.getInfoId())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "No hay usuarios registrados con este código de estudiante"));

        // Convertir enumRol a autoridades para spring security
//        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        // Agregar el rol del user
//        authorityList.add(new SimpleGrantedAuthority("ROLE_" + userModel.getRole().name()));

        String role = "ROLE_" + userModel.getRole().name();
        String token = jwtService.getToken(code, Collections.singletonList(role));

        return User.builder()
                .username(personalInfo.getCode())
                .password(userModel.getPassword())
                .authorities(jwtService.getAuthorities(token))
                .build();
    }


}
