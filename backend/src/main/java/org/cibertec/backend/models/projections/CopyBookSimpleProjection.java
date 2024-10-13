package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.CopyBook;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = {CopyBook.class})
public interface CopyBookSimpleProjection {
    Integer getIdCopy();
    Integer getIdBook();
    String getStatus();
    String getConditionBook();
}
