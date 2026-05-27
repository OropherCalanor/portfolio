package com.ruhatkaratas.taskflow.common.config;

import com.ruhatkaratas.taskflow.auth.entity.Role;
import com.ruhatkaratas.taskflow.auth.entity.RoleName;
import com.ruhatkaratas.taskflow.auth.repository.RoleRepository;
import com.ruhatkaratas.taskflow.project.entity.MembershipRole;
import com.ruhatkaratas.taskflow.project.entity.Project;
import com.ruhatkaratas.taskflow.project.entity.ProjectMember;
import com.ruhatkaratas.taskflow.project.entity.ProjectStatus;
import com.ruhatkaratas.taskflow.project.repository.ProjectMemberRepository;
import com.ruhatkaratas.taskflow.project.repository.ProjectRepository;
import com.ruhatkaratas.taskflow.task.entity.Task;
import com.ruhatkaratas.taskflow.task.entity.TaskPriority;
import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import com.ruhatkaratas.taskflow.task.repository.TaskRepository;
import com.ruhatkaratas.taskflow.user.entity.User;
import com.ruhatkaratas.taskflow.user.entity.UserStatus;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.demo-seed", havingValue = "true")
public class DemoDataInitializer implements CommandLineRunner {

    private static final String OWNER_EMAIL = "demo.owner@taskflow.dev";
    private static final String TEAMMATE_EMAIL = "demo.teammate@taskflow.dev";
    private static final String REVIEWER_EMAIL = "demo.reviewer@taskflow.dev";
    private static final String DEMO_PASSWORD = "Password1";
    private static final String PROJECT_KEY = "TASKFLOW";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (projectRepository.findByKey(PROJECT_KEY).isPresent()) {
            return;
        }

        Role memberRole = roleRepository.findByName(RoleName.ROLE_MEMBER)
                .orElseThrow(() -> new IllegalStateException("ROLE_MEMBER must exist before demo seeding"));

        User owner = findOrCreateUser(
                "Ruhat",
                "Karatas",
                OWNER_EMAIL,
                memberRole
        );
        User teammate = findOrCreateUser(
                "Aylin",
                "Demir",
                TEAMMATE_EMAIL,
                memberRole
        );
        User reviewer = findOrCreateUser(
                "Burak",
                "Kaya",
                REVIEWER_EMAIL,
                memberRole
        );

        Project project = createProject(owner);
        addMember(project, owner, MembershipRole.OWNER);
        addMember(project, teammate, MembershipRole.CONTRIBUTOR);
        addMember(project, reviewer, MembershipRole.MANAGER);

        createTask(
                project,
                "Prepare TaskFlow deployment assets",
                "Finalize README, live demo notes, and release checklist for the public portfolio walkthrough.",
                TaskStatus.TODO,
                TaskPriority.HIGH,
                teammate,
                owner,
                LocalDate.now().plusDays(3)
        );
        createTask(
                project,
                "Review board interactions",
                "Validate drag-and-drop, filters, and assignee flows before the live demo review.",
                TaskStatus.IN_PROGRESS,
                TaskPriority.CRITICAL,
                reviewer,
                owner,
                LocalDate.now().plusDays(1)
        );
        createTask(
                project,
                "Document dashboard analytics improvements",
                "Summarize current analytics panels and define next metrics for the roadmap.",
                TaskStatus.IN_REVIEW,
                TaskPriority.MEDIUM,
                owner,
                reviewer,
                LocalDate.now().plusDays(5)
        );
        createTask(
                project,
                "Capture recruiter-facing screenshots",
                "Store final screenshots for the portfolio case study and README sections.",
                TaskStatus.DONE,
                TaskPriority.MEDIUM,
                teammate,
                owner,
                LocalDate.now().minusDays(1)
        );
    }

    private User findOrCreateUser(String firstName, String lastName, String email, Role memberRole) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseGet(() -> {
                    User user = new User();
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setEmail(email);
                    user.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
                    user.setStatus(UserStatus.ACTIVE);
                    user.setEnabled(true);
                    user.setAccountNonLocked(true);
                    user.setRoles(Set.of(memberRole));
                    return userRepository.save(user);
                });
    }

    private Project createProject(User owner) {
        Project project = new Project();
        project.setName("TaskFlow Portfolio Launch");
        project.setKey(PROJECT_KEY);
        project.setDescription("A seeded demo workspace used to showcase the TaskFlow flagship project during portfolio reviews.");
        project.setStatus(ProjectStatus.ACTIVE);
        project.setOwner(owner);
        return projectRepository.save(project);
    }

    private void addMember(Project project, User user, MembershipRole membershipRole) {
        if (projectMemberRepository.existsByProjectIdAndUserId(project.getId(), user.getId())) {
            return;
        }

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(user);
        member.setMembershipRole(membershipRole);
        member.setJoinedAt(LocalDateTime.now());
        projectMemberRepository.save(member);
    }

    private void createTask(
            Project project,
            String title,
            String description,
            TaskStatus status,
            TaskPriority priority,
            User assignee,
            User reporter,
            LocalDate dueDate
    ) {
        Task task = new Task();
        task.setProject(project);
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        task.setPriority(priority);
        task.setAssignee(assignee);
        task.setReporter(reporter);
        task.setDueDate(dueDate);
        taskRepository.save(task);
    }
}
