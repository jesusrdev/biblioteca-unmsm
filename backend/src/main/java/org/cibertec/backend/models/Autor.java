package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "AUTOR")
public class Autor {
    @Id
    @GeneratedValue
    @Column(name = "id_Autor")
    private int idAutor ;

    @Column(name = "nombre_Autor", length = 50, nullable = false )
    private String nombreAutor;
}
