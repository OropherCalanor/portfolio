package com.ruhatkaratas.taskflow.project.service;

import com.ruhatkaratas.taskflow.project.dto.CreateProjectRequest;
import com.ruhatkaratas.taskflow.project.dto.ProjectResponse;
import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request, String currentUserEmail);

    List<ProjectResponse> getProjectsForUser(String currentUserEmail);

    ProjectResponse getProjectById(Long id, String currentUserEmail);
}

