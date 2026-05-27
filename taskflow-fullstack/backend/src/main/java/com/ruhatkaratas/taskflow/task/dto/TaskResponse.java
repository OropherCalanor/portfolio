package com.ruhatkaratas.taskflow.task.dto;

import com.ruhatkaratas.taskflow.task.entity.TaskPriority;
import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        Long projectId,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        Long assigneeId,
        String assigneeEmail,
        Long reporterId,
        String reporterEmail,
        LocalDate dueDate,
        LocalDateTime createdAt
) {
}

