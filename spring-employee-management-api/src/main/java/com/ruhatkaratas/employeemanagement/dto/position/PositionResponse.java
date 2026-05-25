package com.ruhatkaratas.employeemanagement.dto.position;

import java.time.LocalDateTime;

public record PositionResponse(
        Long id,
        String title,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

