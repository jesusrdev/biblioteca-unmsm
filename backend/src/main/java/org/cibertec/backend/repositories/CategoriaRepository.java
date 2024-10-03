package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoriaRepository extends CrudRepository<Category, Integer> {
}
