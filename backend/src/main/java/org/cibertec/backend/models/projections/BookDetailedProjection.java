package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Book;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "detailed", types = {Book.class})
public interface BookDetailedProjection {
    Integer getIdBook();
    String getTitle();
    AuthorProjection getAuthor();
    CategoryProjection getCategory();
    EditorialProjection getEditorial();
    Date getPublicationDate();
    String getDescription();
    Integer getNumberOfPage();
    String getLanguage();
    String getImageUrl();
    String getIsbn();

    interface AuthorProjection {
        Integer getIdAuthor();
        String getNameAuthor();
    }

    interface CategoryProjection {
        Integer getIdCategory();
        String getNameCategory();
    }

    interface EditorialProjection {
        Integer getIdEditorial();
        String getNameEditorial();
    }
}
