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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("books")
@PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
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

    @PostMapping("/create")
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
        // Obtener la extensión del archivo original
        String originalFilename = imageFile.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generar un UUID para el nombre del archivo
        String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String uniqueFilename = UUID.randomUUID().toString() + "_" + timestamp + extension;

        // Definir la ruta donde se almacenará la imagen
        Path imagePath = Paths.get("src/main/resources/static/books").resolve(uniqueFilename);

        // Crear directorios si no existen
        Files.createDirectories(imagePath.getParent());

        // Guardar la imagen en el disco
        Files.write(imagePath, imageFile.getBytes());

        // Devolver la ruta donde se guardó la imagen
        return "/books/" + uniqueFilename;  // Esta es la ruta en el servidor
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateBook(
            @PathVariable Integer id,
            @RequestParam("title") String title,
            @RequestParam("authorId") Integer authorId,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("editorialId") Integer editorialId,
            @RequestParam("publicationDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date publicationDate,
            @RequestParam("description") String description,
            @RequestParam("numberOfPage") Integer numberOfPage,
            @RequestParam("language") String language,
            @RequestParam("isbn") String isbn,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws Exception {

        // Buscar si el libro existe
        Optional<Book> exiOptionalBook = bookRepository.findById(id);

        // Excepcion en caso no se encuentre
        if (!exiOptionalBook.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Libro no encontrado");
        }

        // Obtener el libro existente
        Book existingBook = exiOptionalBook.get();

        // Actualizar los datos del libro
        existingBook.setTitle(title);

        Author author = new Author();
        author.setIdAuthor(authorId);
        existingBook.setAuthor(author);

        Category category = new Category();
        category.setIdCategory(categoryId);
        existingBook.setCategory(category);

        Editorial editorial = new Editorial();
        editorial.setIdEditorial(editorialId);
        existingBook.setEditorial(editorial);

        existingBook.setPublicationDate(publicationDate);
        existingBook.setDescription(description);
        existingBook.setNumberOfPage(numberOfPage);
        existingBook.setLanguage(language);
        existingBook.setIsbn(isbn);

        // Verifica si se ha subido una nueva imagen
        if (imageFile != null && !imageFile.isEmpty()){

            //Obtener la imagen antigua
            String oldImageUrl = existingBook.getImageUrl().replace("/books/", "");

            // Verificar si existe la imagen
            if (oldImageUrl != null){
                // Obtener el path antiguo
                Path olImagePath = Paths.get("src/main/resources/static/books").resolve(oldImageUrl);
                // Eliminar imagen anterior
                Files.deleteIfExists(olImagePath);

            }

            // Guardar la nueva imagen
            String newImageUrl = saveImage(imageFile);
            existingBook.setImageUrl(newImageUrl);

        }

        try {
            // Guardar los cambios en el repositorio
            Book updateBook = bookRepository.save(existingBook);
            return ResponseEntity.ok(updateBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el libro" + e.getMessage());
        }
    }

    @GetMapping("/search")
    public List<Book> searchBooks(
            @RequestParam(required = false) Integer idEditorial,
            @RequestParam(required = false) Integer idAuthor,
            @RequestParam(required = false) Integer idCategory,
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) String query
    ) {

        // Obtenemos todos los libros y filtramos en memoria
        return StreamSupport.stream(bookRepository.findAll().spliterator(), false)
                .filter(book -> idEditorial == null || book.getEditorial().getIdEditorial() == idEditorial)
                .filter(book -> idAuthor == null || book.getAuthor().getIdAuthor() == idAuthor)
                .filter(book -> idCategory == null || book.getCategory().getIdCategory() == idCategory)
                .filter(book -> isbn == null || book.getIsbn().equalsIgnoreCase(isbn))
                .filter(book -> query == null || book.getTitle().toLowerCase().contains(query.toLowerCase())
                        || book.getAuthor().getNameAuthor().toLowerCase().contains(query.toLowerCase())
                        || book.getEditorial().getNameEditorial().toLowerCase().contains(query.toLowerCase())
                        || book.getCategory().getNameCategory().toLowerCase().contains(query.toLowerCase())
                )
                .collect(Collectors.toList());
    }

}
