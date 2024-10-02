package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CATEGORIA")
public class Categoria {

    @Id
    @GeneratedValue
    @Column(name = "id_categoria")
    private int idCategoria ;

    @Column(name = "nombre_categoria", length = 50, nullable = false )
    private String nombreCategoria;

}
