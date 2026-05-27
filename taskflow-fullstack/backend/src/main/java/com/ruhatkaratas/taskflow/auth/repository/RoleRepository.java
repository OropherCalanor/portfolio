package com.ruhatkaratas.taskflow.auth.repository;

import com.ruhatkaratas.taskflow.auth.entity.Role;
import com.ruhatkaratas.taskflow.auth.entity.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName name);
}

