package com.ruhatkaratas.authapi.controller;

import com.ruhatkaratas.authapi.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Operation(summary = "Example admin-only endpoint")
    @GetMapping("/dashboard")
    public ApiResponse<Map<String, String>> adminDashboard() {
        return ApiResponse.success(
                "Admin dashboard accessed successfully",
                Map.of("scope", "ADMIN", "message", "Sensitive admin data is available")
        );
    }
}
