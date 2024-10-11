package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Loan;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = {Loan.class})
public interface LoanSimpleProjection {
    Integer getIdLoan();
    Integer getIdCopy();
    Integer getIdUser();
    String getLoanStatus();
    String getDateLoan();
    String getReturnDate();
}
