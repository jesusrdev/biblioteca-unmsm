package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findByIdCategory(Integer idCategory);
}
