package com.ruhatkaratas.authapi.controller;

import com.ruhatkaratas.authapi.dto.common.ApiResponse;
import com.ruhatkaratas.authapi.dto.user.UserResponse;
import com.ruhatkaratas.authapi.security.CustomUserDetails;
import com.ruhatkaratas.authapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get the current authenticated user")
    @GetMapping("/me")
    public ApiResponse<UserResponse> getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return ApiResponse.success("Current user retrieved successfully", userService.getCurrentUser(currentUser.getEmail()));
    }
}
