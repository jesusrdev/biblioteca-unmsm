package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.CopyBook;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "detailed", types = {CopyBook.class})
public interface CopyBookDetailedProjection {
    Integer getIdCopy();
    Book getBook();
    String getStatus();
    String getConditionBook();

    interface Book {
        Integer getIdBook();
        String getTitle();
    }
}
