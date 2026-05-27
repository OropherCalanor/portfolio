package com.ruhatkaratas.taskflow.task.dto;

import jakarta.validation.constraints.NotNull;

public record AssignTaskRequest(@NotNull Long assigneeUserId) {
}

