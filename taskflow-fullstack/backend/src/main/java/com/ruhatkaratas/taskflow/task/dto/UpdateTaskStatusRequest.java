package com.ruhatkaratas.taskflow.task.dto;

import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateTaskStatusRequest(@NotNull TaskStatus status) {
}

