package org.cibertec.backend.repositories;

import org.cibertec.backend.models.PersonalInfo;
import org.springframework.data.repository.CrudRepository;

public interface PersonalInfoRepository extends CrudRepository<PersonalInfo, Integer> {
}
