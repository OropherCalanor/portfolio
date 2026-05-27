package com.ruhatkaratas.taskflow.dashboard.dto;

import com.ruhatkaratas.taskflow.task.entity.TaskPriority;
import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import java.time.LocalDate;

public record DashboardTaskItem(
        Long id,
        Long projectId,
        String projectName,
        String title,
        TaskStatus status,
        TaskPriority priority,
        LocalDate dueDate
) {
}

