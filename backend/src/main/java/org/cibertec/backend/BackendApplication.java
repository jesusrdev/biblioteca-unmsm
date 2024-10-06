package org.cibertec.backend;

import org.cibertec.backend.repositories.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	private final CategoryRepository categoryRepository;
	private final AuthorRepository authorRepository;
	private final EditorialRepository editorialRepository;
	private final BookRepository bookRepository;
	private final CopyBookRepository copyBookRepository;

	public BackendApplication(
			CategoryRepository categoryRepository,
			AuthorRepository authorRepository,
			EditorialRepository editorialRepository,
			BookRepository bookRepository,
			CopyBookRepository copyBookRepository


	) {
		this.categoryRepository = categoryRepository;
		this.authorRepository = authorRepository;
		this.editorialRepository = editorialRepository;
		this.bookRepository = bookRepository;
		this.copyBookRepository = copyBookRepository;

	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
