package org.cibertec.backend.repositories;

import org.cibertec.backend.models.Loan;
import org.springframework.data.repository.CrudRepository;

public interface LoanRepository extends CrudRepository<Loan, Integer> {
}
