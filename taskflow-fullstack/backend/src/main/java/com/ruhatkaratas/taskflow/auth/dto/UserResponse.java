package com.ruhatkaratas.taskflow.auth.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        Set<String> roles,
        LocalDateTime createdAt
) {
}

