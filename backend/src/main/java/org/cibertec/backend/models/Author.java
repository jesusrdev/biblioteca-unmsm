package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "AUTHOR")
public class Author {
    @Id
    @GeneratedValue
    @Column(name = "id_Author")
    private int idAuthor ;

    @Column(name = "name_Author", length = 50, nullable = false )
    private String nameAuthor;
}
