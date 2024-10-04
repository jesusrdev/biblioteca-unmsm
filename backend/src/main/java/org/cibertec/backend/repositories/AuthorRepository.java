package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, Integer> {
}
