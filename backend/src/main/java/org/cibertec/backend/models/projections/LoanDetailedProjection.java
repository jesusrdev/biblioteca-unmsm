package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Loan;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "detailed", types = {Loan.class})
public interface LoanDetailedProjection {
    Integer getIdLoan();
    CopyBook getCopyBook();
    User getUser();
    String getLoanStatus();
    String getDateLoan();
    String getReturnDate();

    interface CopyBook {
        Integer getIdCopy();
        Book getBook();
    }

    interface User {
        Integer getUserId();
        PersonalInfo getPersonalInfo();

        interface PersonalInfo {
            Integer getInfoId();
            String getFirstName();
            String getLastName();
        }
    }

    interface Book {
        Integer getIdBook();
        String getTitle();
    }
}
