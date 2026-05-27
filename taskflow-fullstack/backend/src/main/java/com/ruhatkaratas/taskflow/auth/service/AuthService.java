package com.ruhatkaratas.taskflow.auth.service;

import com.ruhatkaratas.taskflow.auth.dto.AuthResponse;
import com.ruhatkaratas.taskflow.auth.dto.CurrentUserResponse;
import com.ruhatkaratas.taskflow.auth.dto.LoginRequest;
import com.ruhatkaratas.taskflow.auth.dto.LogoutRequest;
import com.ruhatkaratas.taskflow.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    void logout(LogoutRequest request);

    CurrentUserResponse getCurrentUser(String email);
}
