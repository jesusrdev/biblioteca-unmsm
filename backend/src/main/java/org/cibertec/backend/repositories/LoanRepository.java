package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Loan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LoanRepository extends CrudRepository<Loan, Integer> {

    @Query("select l from Loan l where l.idUser = ?1")
    List<Loan> findByUserId(int idUser);

}
