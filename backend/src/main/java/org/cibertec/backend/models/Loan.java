package org.cibertec.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "LOAN")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_loan")
    private int idLoan;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_user", nullable = false)
    private UserModel user;

    @Column(name = "id_user", nullable = false, insertable = false, updatable = false)
    private int idUser;

    @ManyToOne
    @JoinColumn(name = "id_copy", nullable = false)
    private CopyBook copyBook;

    @Column(name = "id_copy", nullable = false, insertable = false, updatable = false)
    private int idCopy;

    @Temporal(TemporalType.DATE)
    private Date dateLoan;

    @Temporal(TemporalType.DATE)
    private Date returnDate;

    @Column(name = "loan_status", nullable = false)
    private String loanStatus;
}
