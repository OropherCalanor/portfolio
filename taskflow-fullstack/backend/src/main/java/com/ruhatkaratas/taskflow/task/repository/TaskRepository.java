package com.ruhatkaratas.taskflow.task.repository;

import com.ruhatkaratas.taskflow.task.entity.Task;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    List<Task> findByProjectIdOrderByCreatedAtDesc(Long projectId);

    List<Task> findByProjectIdIn(List<Long> projectIds);

    List<Task> findByAssigneeIdOrderByDueDateAscCreatedAtDesc(Long assigneeId);

    List<Task> findByProjectIdInAndDueDateIsNotNullAndDueDateGreaterThanEqualOrderByDueDateAsc(List<Long> projectIds, LocalDate dueDate);
}
