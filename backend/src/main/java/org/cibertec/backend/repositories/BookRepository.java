package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {
}
