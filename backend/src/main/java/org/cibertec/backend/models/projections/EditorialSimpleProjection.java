package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Editorial;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = { Editorial.class })
public interface EditorialSimpleProjection {
    Integer getIdEditorial();
    String getNameEditorial();
}
