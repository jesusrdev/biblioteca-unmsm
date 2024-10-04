package org.cibertec.backend.controllers;

import org.cibertec.backend.models.Author;
import org.cibertec.backend.models.Book;
import org.cibertec.backend.models.Category;
import org.cibertec.backend.models.Editorial;
import org.cibertec.backend.repositories.AuthorRepository;
import org.cibertec.backend.repositories.BookRepository;
import org.cibertec.backend.repositories.CategoryRepository;
import org.cibertec.backend.repositories.EditorialRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@RestController
public class BookController {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final EditorialRepository editorialRepository;

    public BookController(BookRepository bookRepository, AuthorRepository authorRepository,
                          CategoryRepository categoryRepository, EditorialRepository editorialRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
        this.editorialRepository = editorialRepository;
    }

    @PostMapping("/createbook")
    public ResponseEntity<?> createBook(
            @RequestParam("title") String title,
            @RequestParam("authorId") Integer authorId,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("editorialId") Integer editorialId,
            @RequestParam("publicationDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date publicationDate,
            @RequestParam("description") String description,
            @RequestParam("numberOfPage") Integer numberOfPage,
            @RequestParam("language") String language,
            @RequestParam("isbn") String isbn,
            @RequestParam("imageFile") MultipartFile imageFile) throws Exception {

        // Validar que el autor, la categoría y la editorial existan
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("El autor no existe con ID: " + authorId));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("La categoría no existe con ID: " + categoryId));

        Editorial editorial = editorialRepository.findById(editorialId)
                .orElseThrow(() -> new RuntimeException("La editorial no existe con ID: " + editorialId));

        // Guardar la imagen
        String imageUrl = saveImage(imageFile);

        // Crear una nueva instancia de Book
        Book newBook = new Book();
        newBook.setTitle(title);
        newBook.setAuthor(author); // Asigna el autor
        newBook.setCategory(category); // Asigna la categoría
        newBook.setEditorial(editorial); // Asigna la editorial
        newBook.setPublicationDate(publicationDate);
        newBook.setDescription(description);
        newBook.setNumberOfPage(numberOfPage);
        newBook.setLanguage(language);
        newBook.setIsbn(isbn);
        newBook.setImageUrl(imageUrl);

        // Guardar el libro en el repositorio
        Book savedBook = bookRepository.save(newBook);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    private String saveImage(MultipartFile imageFile) throws Exception {
        // Obtener el nombre original del archivo
        String originalFilename = imageFile.getOriginalFilename();

        // Definir la ruta donde se almacenará la imagen
        Path imagePath = Paths.get("uploads/images", originalFilename);

        // Crear directorios si no existen
        Files.createDirectories(imagePath.getParent());

        // Guardar la imagen en el disco
        Files.write(imagePath, imageFile.getBytes());

        // Devolver la URL de la imagen (en este caso, la ruta del archivo)
        return imagePath.toString();  // Esta es la ruta en el servidor
    }

}
