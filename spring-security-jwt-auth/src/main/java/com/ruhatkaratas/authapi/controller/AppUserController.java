package com.ruhatkaratas.authapi.controller;

import com.ruhatkaratas.authapi.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class AppUserController {

    @Operation(summary = "Example user endpoint")
    @GetMapping("/profile")
    public ApiResponse<Map<String, String>> userProfile() {
        return ApiResponse.success(
                "User profile endpoint accessed successfully",
                Map.of("scope", "AUTHENTICATED_USER", "message", "User profile data is available")
        );
    }
}
