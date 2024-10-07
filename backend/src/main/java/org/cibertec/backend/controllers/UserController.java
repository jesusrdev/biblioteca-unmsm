package org.cibertec.backend.controllers;

import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.cibertec.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserRepository userRepository;
    private final PersonalInfoRepository personalInfoRepository;

    public UserController(UserRepository userRepository, PersonalInfoRepository personalInfoRepository){
        this.userRepository = userRepository;
        this.personalInfoRepository = personalInfoRepository;
    }
}
