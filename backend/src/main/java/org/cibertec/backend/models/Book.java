package org.cibertec.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "BOOK")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_book")
    private Integer idBook;

    @Column(name = "title", length = 50, nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "id_author", nullable = false)
    private Author author;

    @Column(name = "id_author", nullable = false, insertable = false, updatable = false)
    private Integer idAuthor;

    @ManyToOne
    @JoinColumn(name = "id_category", nullable = false)
    private Category category;

    @Column(name = "id_category", nullable = false, insertable = false, updatable = false)
    private Integer idCategory;

    @ManyToOne
    @JoinColumn(name = "id_editorial", nullable = false)
    private Editorial editorial;

    @Column(name = "id_editorial", nullable = false, insertable = false, updatable = false)
    private Integer idEditorial;

    @Temporal(TemporalType.DATE)
    private Date publicationDate;

    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "number_of_page", nullable = false)
    private Integer numberOfPage;

    @Column(name = "language", length = 50, nullable = false)
    private String language;

    @Column(name = "image_url", length = 300, nullable = false)
    private String imageUrl;

    @Column(name = "isbn", length = 10, nullable = false)
    private String isbn;

    @JsonIgnore
    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<CopyBook> copyBooks;


}
