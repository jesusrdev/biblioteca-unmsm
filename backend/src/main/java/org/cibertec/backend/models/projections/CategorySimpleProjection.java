package org.cibertec.backend.models.projections;

import org.cibertec.backend.models.Category;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "simple", types = { Category.class })
public interface CategorySimpleProjection {
    Integer getIdCategory();
    String getNameCategory();
}
