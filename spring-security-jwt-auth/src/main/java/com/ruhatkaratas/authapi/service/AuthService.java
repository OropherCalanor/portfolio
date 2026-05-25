package com.ruhatkaratas.authapi.service;

import com.ruhatkaratas.authapi.dto.auth.AuthResponse;
import com.ruhatkaratas.authapi.dto.auth.LoginRequest;
import com.ruhatkaratas.authapi.dto.auth.LogoutRequest;
import com.ruhatkaratas.authapi.dto.auth.RefreshTokenRequest;
import com.ruhatkaratas.authapi.dto.auth.RegisterRequest;
import com.ruhatkaratas.authapi.dto.user.UserResponse;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    void logout(LogoutRequest request);
}
