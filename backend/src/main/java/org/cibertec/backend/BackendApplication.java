package org.cibertec.backend;

import org.cibertec.backend.repositories.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class BackendApplication {

	private final CategoryRepository categoryRepository;
	private final AuthorRepository authorRepository;
	private final EditorialRepository editorialRepository;
	private final BookRepository bookRepository;
	private final CopyBookRepository copyBookRepository;
	private final PersonalInfoRepository personalInfoRepository;
	private final UserRepository userRepository;
	private final LoanRepository loanRepository;


	public BackendApplication(
			CategoryRepository categoryRepository,
			AuthorRepository authorRepository,
			EditorialRepository editorialRepository,
			BookRepository bookRepository,
			CopyBookRepository copyBookRepository,
			PersonalInfoRepository personalInfoRepository,
			UserRepository userRepository,
			LoanRepository loanRepository
	) {
		this.categoryRepository = categoryRepository;
		this.authorRepository = authorRepository;
		this.editorialRepository = editorialRepository;
		this.bookRepository = bookRepository;
		this.copyBookRepository = copyBookRepository;
		this.personalInfoRepository = personalInfoRepository;
		this.userRepository = userRepository;
		this.loanRepository = loanRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
