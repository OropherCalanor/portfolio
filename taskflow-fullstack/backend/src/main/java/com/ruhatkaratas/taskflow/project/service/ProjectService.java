package com.ruhatkaratas.taskflow.project.service;

import com.ruhatkaratas.taskflow.project.dto.AddProjectMemberRequest;
import com.ruhatkaratas.taskflow.project.dto.CreateProjectRequest;
import com.ruhatkaratas.taskflow.project.dto.ProjectMemberResponse;
import com.ruhatkaratas.taskflow.project.dto.ProjectResponse;
import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request, String currentUserEmail);

    List<ProjectResponse> getProjectsForUser(String currentUserEmail);

    ProjectResponse getProjectById(Long id, String currentUserEmail);

    List<ProjectMemberResponse> getProjectMembers(Long id, String currentUserEmail);

    ProjectMemberResponse addProjectMember(Long id, AddProjectMemberRequest request, String currentUserEmail);
}
