package com.ruhatkaratas.taskflow.project.service.impl;

import com.ruhatkaratas.taskflow.common.exception.BadRequestException;
import com.ruhatkaratas.taskflow.common.exception.ResourceNotFoundException;
import com.ruhatkaratas.taskflow.project.dto.CreateProjectRequest;
import com.ruhatkaratas.taskflow.project.dto.ProjectMemberResponse;
import com.ruhatkaratas.taskflow.project.dto.ProjectResponse;
import com.ruhatkaratas.taskflow.project.entity.MembershipRole;
import com.ruhatkaratas.taskflow.project.entity.Project;
import com.ruhatkaratas.taskflow.project.entity.ProjectMember;
import com.ruhatkaratas.taskflow.project.entity.ProjectStatus;
import com.ruhatkaratas.taskflow.project.repository.ProjectMemberRepository;
import com.ruhatkaratas.taskflow.project.repository.ProjectRepository;
import com.ruhatkaratas.taskflow.project.service.ProjectService;
import com.ruhatkaratas.taskflow.user.entity.User;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    @Override
    public ProjectResponse createProject(CreateProjectRequest request, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        String normalizedKey = request.key().trim().toUpperCase();

        if (projectRepository.findByKey(normalizedKey).isPresent()) {
            throw new BadRequestException("Project key is already in use");
        }

        Project project = new Project();
        project.setName(request.name().trim());
        project.setKey(normalizedKey);
        project.setDescription(request.description() == null ? null : request.description().trim());
        project.setStatus(ProjectStatus.ACTIVE);
        project.setOwner(currentUser);

        Project savedProject = projectRepository.save(project);

        ProjectMember ownerMembership = new ProjectMember();
        ownerMembership.setProject(savedProject);
        ownerMembership.setUser(currentUser);
        ownerMembership.setMembershipRole(MembershipRole.OWNER);
        projectMemberRepository.save(ownerMembership);

        return mapToResponse(savedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjectsForUser(String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        return projectMemberRepository.findByUserId(currentUser.getId()).stream()
                .map(ProjectMember::getProject)
                .distinct()
                .sorted(Comparator.comparing(Project::getCreatedAt).reversed())
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);

        Project project = findAccessibleProject(id, currentUser.getId());

        return mapToResponse(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectMemberResponse> getProjectMembers(Long id, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        Project project = findAccessibleProject(id, currentUser.getId());

        return projectMemberRepository.findByProjectId(project.getId()).stream()
                .sorted(Comparator.comparing(ProjectMember::getJoinedAt))
                .map(this::mapToMemberResponse)
                .toList();
    }

    private User findUser(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private ProjectResponse mapToResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getKey(),
                project.getDescription(),
                project.getStatus(),
                project.getOwner().getId(),
                project.getOwner().getEmail(),
                project.getCreatedAt()
        );
    }

    private ProjectMemberResponse mapToMemberResponse(ProjectMember member) {
        return new ProjectMemberResponse(
                member.getUser().getId(),
                member.getUser().getFirstName(),
                member.getUser().getLastName(),
                member.getUser().getEmail(),
                member.getMembershipRole(),
                member.getJoinedAt()
        );
    }

    private Project findAccessibleProject(Long projectId, Long currentUserId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        boolean belongsToProject = projectMemberRepository.findByProjectId(project.getId()).stream()
                .anyMatch(member -> member.getUser().getId().equals(currentUserId));

        if (!belongsToProject) {
            throw new ResourceNotFoundException("Project not found");
        }

        return project;
    }
}
