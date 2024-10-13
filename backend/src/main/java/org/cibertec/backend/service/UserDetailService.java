package org.cibertec.backend.service;

import org.cibertec.backend.models.UserModel;
import org.cibertec.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Buscar al user por su nombre
        UserModel userModel = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        // Convertir enumRol a autoridades para spring security
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        // Agregar el rol del user
        authorityList.add( new SimpleGrantedAuthority("ROLE_" + userModel.getRole().name()));


        return new User(userModel.getUsername(),
                userModel.getPassword(),
                true,
                true,
                true,
                true,
                authorityList);
    }



}
