package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Editorial;
import org.cibertec.backend.repositories.EditorialRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditorialController {
    public final EditorialRepository editorialRepository;

    public EditorialController(EditorialRepository editorialRepository){
        this.editorialRepository = editorialRepository;
    }

    @GetMapping("/editorial")
    public Iterable<Editorial> getCEditorial(){
        return editorialRepository.findAll();
    }
}
