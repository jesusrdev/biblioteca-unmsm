package org.cibertec.backend.repositories;

import org.cibertec.backend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
