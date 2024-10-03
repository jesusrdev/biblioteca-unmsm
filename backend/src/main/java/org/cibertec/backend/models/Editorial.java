package org.cibertec.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "EDITORIAL")
public class Editorial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_editorial")
    private int idEditorial ;

    @Column(name = "name_editorial", length = 50, nullable = false )
    private String nameEditorial;

    @JsonIgnore
    @OneToMany(mappedBy = "editorial", fetch = FetchType.LAZY)
    private List<Book> books;
}
