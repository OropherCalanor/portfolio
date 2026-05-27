package com.ruhatkaratas.taskflow.project.repository;

import com.ruhatkaratas.taskflow.project.entity.Project;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByKey(String key);
}

