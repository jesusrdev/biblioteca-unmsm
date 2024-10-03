package org.cibertec.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CATEGORY")
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "id_category")
    private int idCategory ;

    @Column(name = "name_category", length = 50, nullable = false )
    private String nameCategory;

}
