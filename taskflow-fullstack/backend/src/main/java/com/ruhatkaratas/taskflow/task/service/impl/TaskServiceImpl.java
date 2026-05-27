package com.ruhatkaratas.taskflow.task.service.impl;

import com.ruhatkaratas.taskflow.common.exception.BadRequestException;
import com.ruhatkaratas.taskflow.common.exception.ResourceNotFoundException;
import com.ruhatkaratas.taskflow.project.entity.Project;
import com.ruhatkaratas.taskflow.project.repository.ProjectMemberRepository;
import com.ruhatkaratas.taskflow.project.repository.ProjectRepository;
import com.ruhatkaratas.taskflow.task.dto.AssignTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.CreateTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.TaskResponse;
import com.ruhatkaratas.taskflow.task.dto.UpdateTaskStatusRequest;
import com.ruhatkaratas.taskflow.task.entity.Task;
import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import com.ruhatkaratas.taskflow.task.repository.TaskRepository;
import com.ruhatkaratas.taskflow.task.service.TaskService;
import com.ruhatkaratas.taskflow.user.entity.User;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    @Override
    public TaskResponse createTask(CreateTaskRequest request, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        Project project = findProject(request.projectId());
        ensureProjectMembership(project.getId(), currentUser.getId());

        Task task = new Task();
        task.setProject(project);
        task.setTitle(request.title().trim());
        task.setDescription(request.description() == null ? null : request.description().trim());
        task.setPriority(request.priority());
        task.setStatus(TaskStatus.TODO);
        task.setDueDate(request.dueDate());
        task.setReporter(currentUser);

        return mapToResponse(taskRepository.save(task));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getTasksByProject(Long projectId, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        ensureProjectMembership(projectId, currentUser.getId());

        return taskRepository.findByProjectIdOrderByCreatedAtDesc(projectId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public TaskResponse updateTaskStatus(Long taskId, UpdateTaskStatusRequest request, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        Task task = findTask(taskId);
        ensureProjectMembership(task.getProject().getId(), currentUser.getId());

        task.setStatus(request.status());
        return mapToResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse assignTask(Long taskId, AssignTaskRequest request, String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        Task task = findTask(taskId);
        ensureProjectMembership(task.getProject().getId(), currentUser.getId());

        User assignee = userRepository.findById(request.assigneeUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));

        if (!projectMemberRepository.existsByProjectIdAndUserId(task.getProject().getId(), assignee.getId())) {
            throw new BadRequestException("Assignee must be a member of the project");
        }

        task.setAssignee(assignee);
        return mapToResponse(taskRepository.save(task));
    }

    private User findUser(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Project findProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    }

    private Task findTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    private void ensureProjectMembership(Long projectId, Long userId) {
        if (!projectMemberRepository.existsByProjectIdAndUserId(projectId, userId)) {
            throw new ResourceNotFoundException("Project not found");
        }
    }

    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getProject().getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getAssignee() != null ? task.getAssignee().getId() : null,
                task.getAssignee() != null ? task.getAssignee().getEmail() : null,
                task.getReporter().getId(),
                task.getReporter().getEmail(),
                task.getDueDate(),
                task.getCreatedAt()
        );
    }
}

