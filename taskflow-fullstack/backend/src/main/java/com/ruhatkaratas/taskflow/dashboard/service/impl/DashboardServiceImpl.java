package com.ruhatkaratas.taskflow.dashboard.service.impl;

import com.ruhatkaratas.taskflow.dashboard.dto.DashboardSummaryResponse;
import com.ruhatkaratas.taskflow.dashboard.dto.DashboardTaskItem;
import com.ruhatkaratas.taskflow.dashboard.service.DashboardService;
import com.ruhatkaratas.taskflow.project.entity.ProjectMember;
import com.ruhatkaratas.taskflow.project.repository.ProjectMemberRepository;
import com.ruhatkaratas.taskflow.task.entity.Task;
import com.ruhatkaratas.taskflow.task.repository.TaskRepository;
import com.ruhatkaratas.taskflow.user.entity.User;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final TaskRepository taskRepository;

    @Override
    public DashboardSummaryResponse getSummary(String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        List<Long> projectIds = getProjectIds(currentUser.getId());
        List<Task> projectTasks = projectIds.isEmpty() ? Collections.emptyList() : taskRepository.findByProjectIdIn(projectIds);

        Map<String, Long> tasksByStatus = projectTasks.stream()
                .collect(Collectors.groupingBy(task -> task.getStatus().name(), Collectors.counting()));

        Map<String, Long> tasksByPriority = projectTasks.stream()
                .collect(Collectors.groupingBy(task -> task.getPriority().name(), Collectors.counting()));

        List<DashboardTaskItem> upcomingDeadlines = getUpcomingDeadlines(currentUserEmail);
        List<DashboardTaskItem> myTasks = getMyTasks(currentUserEmail);

        return new DashboardSummaryResponse(
                projectIds.size(),
                myTasks.size(),
                tasksByStatus,
                tasksByPriority,
                upcomingDeadlines
        );
    }

    @Override
    public List<DashboardTaskItem> getMyTasks(String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);

        return taskRepository.findByAssigneeIdOrderByDueDateAscCreatedAtDesc(currentUser.getId()).stream()
                .map(this::mapToDashboardTask)
                .toList();
    }

    @Override
    public List<DashboardTaskItem> getUpcomingDeadlines(String currentUserEmail) {
        User currentUser = findUser(currentUserEmail);
        List<Long> projectIds = getProjectIds(currentUser.getId());

        if (projectIds.isEmpty()) {
            return List.of();
        }

        return taskRepository.findByProjectIdInAndDueDateIsNotNullAndDueDateGreaterThanEqualOrderByDueDateAsc(
                        projectIds,
                        LocalDate.now()
                ).stream()
                .limit(5)
                .map(this::mapToDashboardTask)
                .toList();
    }

    private User findUser(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new com.ruhatkaratas.taskflow.common.exception.ResourceNotFoundException("User not found"));
    }

    private List<Long> getProjectIds(Long userId) {
        return projectMemberRepository.findByUserId(userId).stream()
                .map(ProjectMember::getProject)
                .map(project -> project.getId())
                .distinct()
                .toList();
    }

    private DashboardTaskItem mapToDashboardTask(Task task) {
        return new DashboardTaskItem(
                task.getId(),
                task.getProject().getId(),
                task.getProject().getName(),
                task.getTitle(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate()
        );
    }
}

