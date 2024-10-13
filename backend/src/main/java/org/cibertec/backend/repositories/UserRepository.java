package org.cibertec.backend.repositories;

import org.cibertec.backend.models.UserModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {

    @Query("select u from UserModel u where u.username = ?1")
    Optional<UserModel> findByUsername(String username);

}
