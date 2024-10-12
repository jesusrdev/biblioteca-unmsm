package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Author;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = { Author.class })
public interface AuthorSimpleRepository {
    Integer getIdAuthor();
    String getNameAuthor();
}
