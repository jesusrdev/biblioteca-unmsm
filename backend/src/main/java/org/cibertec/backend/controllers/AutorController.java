package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Autor;
import org.cibertec.backend.repositories.AutorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AutorController {

    public final AutorRepository autorRepository;

    public AutorController(AutorRepository autorRepository){
        this.autorRepository = autorRepository;
    }

    @GetMapping("/autor")
    public Iterable<Autor> getAutor(){
        return autorRepository.findAll();
    }
}
