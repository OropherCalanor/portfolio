package com.ruhatkaratas.taskflow.task.dto;

import com.ruhatkaratas.taskflow.task.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record CreateTaskRequest(
        @NotNull Long projectId,
        @NotBlank @Size(max = 180) String title,
        @Size(max = 3000) String description,
        @NotNull TaskPriority priority,
        LocalDate dueDate
) {
}

