package org.cibertec.backend.repositories;

import org.cibertec.backend.models.PersonalInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalInfoRepository extends CrudRepository<PersonalInfo, Integer> {

    Optional<PersonalInfo> findByCode(String code);

}
