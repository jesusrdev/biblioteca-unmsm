package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Categoria;
import org.cibertec.backend.repositories.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class CategoriaControlller {

    public final CategoriaRepository categoriaRepository;

    public CategoriaControlller(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping("/categorias")
    public Iterable<Categoria> getCategorias(){
        return categoriaRepository.findAll();
    }

}
