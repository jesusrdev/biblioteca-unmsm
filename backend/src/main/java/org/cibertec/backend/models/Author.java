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
@Table(name = "AUTHOR")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Author")
    private int idAuthor ;

    @Column(name = "name_Author", length = 50, nullable = false )
    private String nameAuthor;

    @JsonIgnore
    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<Book> books;
}
