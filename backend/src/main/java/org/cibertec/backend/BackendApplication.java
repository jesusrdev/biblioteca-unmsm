package org.cibertec.backend;

import org.cibertec.backend.repositories.AuthorRepository;
import org.cibertec.backend.repositories.CategoriaRepository;
import org.cibertec.backend.repositories.EditorialRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	private final CategoriaRepository categoryRepository;
	private final AuthorRepository authorRepository;
	private final EditorialRepository editorialRepository;

	public BackendApplication(
			CategoriaRepository categoryRepository,
			AuthorRepository authorRepository,
			EditorialRepository editorialRepository
	) {
		this.categoryRepository = categoryRepository;
		this.authorRepository = authorRepository;
		this.editorialRepository = editorialRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
