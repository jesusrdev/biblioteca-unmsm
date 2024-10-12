package org.cibertec.backend.controllers;

import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("isAuthenticated()")
public class PersonalInfoController {
    private final PersonalInfoRepository personalInfoRepository;

    public PersonalInfoController(PersonalInfoRepository personalInfoRepository){
        this.personalInfoRepository = personalInfoRepository;
    }
}
