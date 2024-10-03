package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
