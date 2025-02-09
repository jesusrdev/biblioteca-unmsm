package org.cibertec.backend.controllers;

import org.cibertec.backend.models.*;
import org.cibertec.backend.repositories.CopyBookRepository;
import org.cibertec.backend.repositories.LoanRepository;
import org.cibertec.backend.repositories.PersonalInfoRepository;
import org.cibertec.backend.repositories.UserRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("isAuthenticated()")
@RequestMapping("loans")
public class LoanController {
    private final LoanRepository loanRepository;
    private final CopyBookRepository copyBookRepository;
    private final UserRepository userRepository;
    private final PersonalInfoRepository personalInfoRepository;

    public LoanController(LoanRepository loanRepository, CopyBookRepository copyBookRepository, UserRepository userRepository, PersonalInfoRepository personalInfoRepository){
        this.loanRepository = loanRepository;
        this.copyBookRepository = copyBookRepository;
        this.userRepository = userRepository;
        this.personalInfoRepository = personalInfoRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> loan(
            @RequestParam("id_copy") Integer idCopy,
            @RequestParam("code") String code,
            @RequestParam("date_loan") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateLoan,
            @RequestParam("return_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date returnDate) throws Exception {

        // Obtener el copyBook
        CopyBook copyBook = copyBookRepository.findById(idCopy)
                .orElseThrow(() -> new RuntimeException("El copyBook no existe con ID: " + idCopy));

        // Obtener el user
        Optional<PersonalInfo> infoPersonal = personalInfoRepository.findByCode(code);

        if (infoPersonal.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = infoPersonal.get().getUser();


        // Crear un nuevo objeto de loan
        Loan loan = new Loan();
        loan.setCopyBook(copyBook);
        loan.setUser(user);
        loan.setIdUser(user.getUserId());
        loan.setDateLoan(dateLoan);
        loan.setReturnDate(returnDate);
        loan.setLoanStatus("pendiente");

        try {
            Loan savedLoan = loanRepository.save(loan);

            copyBook.setStatus("prestado");
            copyBookRepository.save(copyBook);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedLoan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar prestamo de libro" + e.getMessage());
        }

    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateloan(
            @PathVariable Integer id,
            @RequestParam("id_copy") Integer idCopy,
            @RequestParam("id_user") Integer idUser,
            @RequestParam("loan_status") String loanStatus,
            @RequestParam("date_loan") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateLoan,
            @RequestParam("return_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date returnDate) throws Exception {

        // Buscar si el prestamo existe
        Optional<Loan> exiOptionalLoan = loanRepository.findById(id);

        // Excepcion en caso no se encuentre
        if (!exiOptionalLoan.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prestamo no encontrado");
        }

        // Obtener el prestamo existente
        Loan existingLoan = exiOptionalLoan.get();

        // Actualizar los datos del prestamo
        existingLoan.setCopyBook(copyBookRepository.findById(idCopy).orElseThrow(() -> new RuntimeException("El copyBook no existe con ID: " + idCopy)));
        existingLoan.setUser(userRepository.findById(idUser).orElseThrow(() -> new RuntimeException("El usuario no existe con ID: " + idUser)));
        existingLoan.setLoanStatus(loanStatus);
        existingLoan.setDateLoan(dateLoan);
        existingLoan.setReturnDate(returnDate);

        try {
            // Guardar los cambios en el repositorio
            Loan updateLoan = loanRepository.save(existingLoan);
            return ResponseEntity.ok(updateLoan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el prestamo" + e.getMessage());
        }
    }

    @GetMapping("user/{code}")
    public ResponseEntity<List<Loan>> getLoanByUser(@PathVariable String code){

        Optional<PersonalInfo> infoPersonal = personalInfoRepository.findByCode(code);

        if (infoPersonal.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Integer idUser = infoPersonal.get().getUser().getUserId();

        List<Loan> loans = loanRepository.findByUserId(idUser);

        if (loans.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ResponseEntity.ok(loans);
    };

}
