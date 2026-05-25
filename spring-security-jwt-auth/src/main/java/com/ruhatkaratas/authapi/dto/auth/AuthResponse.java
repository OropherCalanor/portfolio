package com.ruhatkaratas.authapi.dto.auth;

import com.ruhatkaratas.authapi.dto.user.UserResponse;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn,
        UserResponse user
) {
}
