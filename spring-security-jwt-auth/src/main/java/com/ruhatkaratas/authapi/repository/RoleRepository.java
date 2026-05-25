package com.ruhatkaratas.authapi.repository;

import com.ruhatkaratas.authapi.entity.Role;
import com.ruhatkaratas.authapi.entity.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName name);

    boolean existsByName(RoleName name);
}
