package com.ruhatkaratas.taskflow.project.dto;

import com.ruhatkaratas.taskflow.project.entity.ProjectStatus;
import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String name,
        String key,
        String description,
        ProjectStatus status,
        Long ownerId,
        String ownerEmail,
        LocalDateTime createdAt
) {
}

