package com.ruhatkaratas.employeemanagement.dto.position;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PositionCreateRequest(
        @NotBlank(message = "Position title is required")
        @Size(max = 100, message = "Position title must be at most 100 characters")
        String title,

        @Size(max = 500, message = "Position description must be at most 500 characters")
        String description
) {
}

