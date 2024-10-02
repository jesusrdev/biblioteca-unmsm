package org.cibertec.backend;

import org.cibertec.backend.repositories.AutorRepository;
import org.cibertec.backend.repositories.CategoriaRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	private final CategoriaRepository categoriaRepository;
	private final AutorRepository autorRepository;

	public BackendApplication(
			CategoriaRepository categoriaRepository,
			AutorRepository autorRepository
	) {
		this.categoriaRepository = categoriaRepository;
		this.autorRepository = autorRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
