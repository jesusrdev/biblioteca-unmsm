package org.cibertec.backend.controllers;

import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonalInfoController {
    private final PersonalInfoRepository personalInfoRepository;

    public PersonalInfoController(PersonalInfoRepository personalInfoRepository){
        this.personalInfoRepository = personalInfoRepository;
    }
}
