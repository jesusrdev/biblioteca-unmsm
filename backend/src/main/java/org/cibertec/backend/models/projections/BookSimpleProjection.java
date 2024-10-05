package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Book;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = { Book.class })
public interface BookSimpleProjection {
    Integer getIdBook();
    String getTitle();
    String getLanguage();
    String getImageUrl();
    String getIsbn();
}

