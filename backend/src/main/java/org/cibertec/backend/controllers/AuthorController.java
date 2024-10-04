package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Author;
import org.cibertec.backend.repositories.AuthorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorController {

    public final AuthorRepository authorRepository;

    public AuthorController(AuthorRepository authorRepository){
        this.authorRepository = authorRepository;
    }

    @GetMapping("/author")
    public Iterable<Author> getAuthor(){
        return authorRepository.findAll();
    }
}
