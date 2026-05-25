package com.ruhatkaratas.employeemanagement.repository;

import com.ruhatkaratas.employeemanagement.entity.Position;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {

    boolean existsByTitleIgnoreCase(String title);

    Optional<Position> findByTitleIgnoreCase(String title);
}

