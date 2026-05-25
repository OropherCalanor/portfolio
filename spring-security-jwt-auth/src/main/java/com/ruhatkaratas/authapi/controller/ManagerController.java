package com.ruhatkaratas.authapi.controller;

import com.ruhatkaratas.authapi.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/manager")
public class ManagerController {

    @Operation(summary = "Example manager/admin endpoint")
    @GetMapping("/reports")
    public ApiResponse<Map<String, String>> managerReports() {
        return ApiResponse.success(
                "Manager reports accessed successfully",
                Map.of("scope", "MANAGER_OR_ADMIN", "message", "Manager reports are available")
        );
    }
}
