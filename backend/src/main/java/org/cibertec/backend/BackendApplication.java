package org.cibertec.backend;

import org.cibertec.backend.repositories.AuthorRepository;
import org.cibertec.backend.repositories.BookRepository;
import org.cibertec.backend.repositories.CategoryRepository;
import org.cibertec.backend.repositories.EditorialRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	private final CategoryRepository categoryRepository;
	private final AuthorRepository authorRepository;
	private final EditorialRepository editorialRepository;
	private final BookRepository bookRepository;

	public BackendApplication(
			CategoryRepository categoryRepository,
			AuthorRepository authorRepository,
			EditorialRepository editorialRepository,
			BookRepository bookRepository
	) {
		this.categoryRepository = categoryRepository;
		this.authorRepository = authorRepository;
		this.editorialRepository = editorialRepository;
		this.bookRepository = bookRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
