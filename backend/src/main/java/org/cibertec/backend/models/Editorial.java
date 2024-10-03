package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "EDITORIAL")
public class Editorial {

    @Id
    @GeneratedValue
    @Column(name = "id_editorial")
    private int idEditorial ;

    @Column(name = "name_editorial", length = 50, nullable = false )
    private String nameEditorial;

}
