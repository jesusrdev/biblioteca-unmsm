package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Entity
@Table(name="Copy_Book")
public class CopyBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_copy")
    private Integer idCopy;

    @ManyToOne
    @JoinColumn(name = "id_book", nullable = false)
    private Book book;

    @Column(name = "id_book", nullable = false, insertable = false, updatable = false)
    private Integer idBook;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "condition_book", nullable = false)
    private String conditionBook;
}