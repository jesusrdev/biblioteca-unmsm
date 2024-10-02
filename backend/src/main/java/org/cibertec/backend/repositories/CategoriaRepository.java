package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Categoria;
import org.springframework.data.repository.CrudRepository;

public interface CategoriaRepository extends CrudRepository<Categoria, Integer> {
}
