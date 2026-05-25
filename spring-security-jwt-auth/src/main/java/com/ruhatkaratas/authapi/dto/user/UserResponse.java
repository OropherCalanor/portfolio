package com.ruhatkaratas.authapi.dto.user;

import java.time.LocalDateTime;
import java.util.Set;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        boolean enabled,
        boolean accountNonLocked,
        Set<String> roles,
        LocalDateTime createdAt
) {
}
