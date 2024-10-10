package org.cibertec.backend.controllers;

import org.cibertec.backend.models.*;
import org.cibertec.backend.repositories.BookRepository;
import org.cibertec.backend.repositories.CopyBookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CopyBookController {
    public final CopyBookRepository copyBookRepository;
    public final BookRepository bookRepository;

    public CopyBookController(CopyBookRepository copyBookRepository, BookRepository bookRepository){
        this.copyBookRepository = copyBookRepository; // Mantener copyBookRepository
        this.bookRepository = bookRepository; // Asignar bookRepository
    }

    @PostMapping("/copybook")
    public ResponseEntity<?> copybook(
            @RequestParam("id_book") Integer idBook,
            @RequestParam("status") String status,
            @RequestParam("conditionBook") String conditionBook) throws Exception {

        Book book = bookRepository.findById(idBook)
                .orElseThrow(() -> new RuntimeException("El libro no existe con ID: " + idBook));

        CopyBook newCopyBook = new CopyBook();
        newCopyBook.setBook(book);
        newCopyBook.setStatus(status);
        newCopyBook.setConditionBook(conditionBook);

        try {
            // Guardar los cambios en el repositorio
            CopyBook savedCopyBook = copyBookRepository.save(newCopyBook);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCopyBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar ejemplar del libro" + e.getMessage());
        }


    }

    @PutMapping("updatecopyBook/{id}")
    public ResponseEntity<?> updatecopyBook(
            @PathVariable Integer id,
            @RequestParam("id_book") Integer idBook,
            @RequestParam("status") String status,
            @RequestParam("conditionBook") String conditionBook) throws Exception {

        // Buscar si el ejemplar existe
        Optional<CopyBook> exiOptionalCopyBook = copyBookRepository.findById(id);

        // Excepción en caso no se encuentre
        if (!exiOptionalCopyBook.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ejemplar no encontrado");
        }

        // Obtener el ejemplar existente
        CopyBook existingCopyBook = exiOptionalCopyBook.get();

        // Actualizar los datos del ejemplar
        existingCopyBook.setStatus(status);

        // Crear y asignar el libro al ejemplar
        Book book = new Book();
        book.setIdBook(idBook);
        existingCopyBook.setBook(book);

        existingCopyBook.setConditionBook(conditionBook);

        try {
            // Guardar los cambios en el repositorio
            CopyBook updatedCopyBook = copyBookRepository.save(existingCopyBook);
            return ResponseEntity.ok(updatedCopyBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el ejemplar: " + e.getMessage());
        }
    }

}






