package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Category;
import org.cibertec.backend.repositories.CategoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
public class CategoryController {

    public final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/category")
    public Iterable<Category> getCategories(){
        return categoryRepository.findAll();
    }

}
