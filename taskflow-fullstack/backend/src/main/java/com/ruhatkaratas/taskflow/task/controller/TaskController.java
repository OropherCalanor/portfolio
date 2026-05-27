package com.ruhatkaratas.taskflow.task.controller;

import com.ruhatkaratas.taskflow.common.response.ApiResponse;
import com.ruhatkaratas.taskflow.task.dto.AssignTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.CreateTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.TaskResponse;
import com.ruhatkaratas.taskflow.task.dto.UpdateTaskStatusRequest;
import com.ruhatkaratas.taskflow.task.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @Valid @RequestBody CreateTaskRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Task created successfully",
                        taskService.createTask(request, authentication.getName())
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getTasksByProject(
            @RequestParam Long projectId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Tasks retrieved successfully",
                taskService.getTasksByProject(projectId, authentication.getName())
        ));
    }

    @PatchMapping("/{taskId}/status")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTaskStatus(
            @PathVariable Long taskId,
            @Valid @RequestBody UpdateTaskStatusRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Task status updated successfully",
                taskService.updateTaskStatus(taskId, request, authentication.getName())
        ));
    }

    @PatchMapping("/{taskId}/assignee")
    public ResponseEntity<ApiResponse<TaskResponse>> assignTask(
            @PathVariable Long taskId,
            @Valid @RequestBody AssignTaskRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Task assignee updated successfully",
                taskService.assignTask(taskId, request, authentication.getName())
        ));
    }
}

