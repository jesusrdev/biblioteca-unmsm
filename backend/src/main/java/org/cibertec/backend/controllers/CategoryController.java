package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Category;
import org.cibertec.backend.repositories.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class CategoryController {

    public final CategoriaRepository categoryRepository;

    public CategoryController(CategoriaRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/category")
    public Iterable<Category> getCategories(){
        return categoryRepository.findAll();
    }

}
