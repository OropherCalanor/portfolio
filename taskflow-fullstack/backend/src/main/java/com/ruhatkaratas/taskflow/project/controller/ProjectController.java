package com.ruhatkaratas.taskflow.project.controller;

import com.ruhatkaratas.taskflow.project.dto.AddProjectMemberRequest;
import com.ruhatkaratas.taskflow.common.response.ApiResponse;
import com.ruhatkaratas.taskflow.project.dto.CreateProjectRequest;
import com.ruhatkaratas.taskflow.project.dto.ProjectMemberResponse;
import com.ruhatkaratas.taskflow.project.dto.ProjectResponse;
import com.ruhatkaratas.taskflow.project.service.ProjectService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Project created successfully",
                        projectService.createProject(request, authentication.getName())
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getProjects(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                "Projects retrieved successfully",
                projectService.getProjectsForUser(authentication.getName())
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProject(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Project retrieved successfully",
                projectService.getProjectById(id, authentication.getName())
        ));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<ApiResponse<List<ProjectMemberResponse>>> getProjectMembers(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Project members retrieved successfully",
                projectService.getProjectMembers(id, authentication.getName())
        ));
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<ApiResponse<ProjectMemberResponse>> addProjectMember(
            @PathVariable Long id,
            @Valid @RequestBody AddProjectMemberRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Project member added successfully",
                        projectService.addProjectMember(id, request, authentication.getName())
                ));
    }
}
