package com.ruhatkaratas.taskflow.dashboard.controller;

import com.ruhatkaratas.taskflow.common.response.ApiResponse;
import com.ruhatkaratas.taskflow.dashboard.dto.DashboardSummaryResponse;
import com.ruhatkaratas.taskflow.dashboard.dto.DashboardTaskItem;
import com.ruhatkaratas.taskflow.dashboard.service.DashboardService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getSummary(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                "Dashboard summary retrieved successfully",
                dashboardService.getSummary(authentication.getName())
        ));
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<ApiResponse<List<DashboardTaskItem>>> getMyTasks(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                "Assigned tasks retrieved successfully",
                dashboardService.getMyTasks(authentication.getName())
        ));
    }

    @GetMapping("/upcoming-deadlines")
    public ResponseEntity<ApiResponse<List<DashboardTaskItem>>> getUpcomingDeadlines(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                "Upcoming deadlines retrieved successfully",
                dashboardService.getUpcomingDeadlines(authentication.getName())
        ));
    }
}

