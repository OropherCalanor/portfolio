package com.ruhatkaratas.taskflow.dashboard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.taskflow.auth.dto.LoginRequest;
import com.ruhatkaratas.taskflow.auth.dto.RegisterRequest;
import com.ruhatkaratas.taskflow.project.dto.CreateProjectRequest;
import com.ruhatkaratas.taskflow.task.dto.AssignTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.CreateTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.UpdateTaskStatusRequest;
import com.ruhatkaratas.taskflow.task.entity.TaskPriority;
import com.ruhatkaratas.taskflow.task.entity.TaskStatus;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class DashboardControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void dashboardSummaryAndTaskViewsWorkForAuthenticatedUser() throws Exception {
        register("dash@example.com");
        String token = loginAndGetToken("dash@example.com", "Password1");
        long userId = getCurrentUserId(token);
        long projectId = createProject(token, "DSH", "Dashboard Project");
        long taskId = createTask(token, projectId, "Review dashboard data", TaskPriority.CRITICAL, LocalDate.now().plusDays(2));

        mockMvc.perform(patch("/api/v1/tasks/" + taskId + "/assignee")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AssignTaskRequest(userId))))
                .andExpect(status().isOk());

        mockMvc.perform(patch("/api/v1/tasks/" + taskId + "/status")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new UpdateTaskStatusRequest(TaskStatus.IN_PROGRESS))))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/v1/dashboard/summary")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.projectCount").value(1))
                .andExpect(jsonPath("$.data.assignedTaskCount").value(1))
                .andExpect(jsonPath("$.data.tasksByStatus.IN_PROGRESS").value(1))
                .andExpect(jsonPath("$.data.tasksByPriority.CRITICAL").value(1));

        mockMvc.perform(get("/api/v1/dashboard/my-tasks")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Review dashboard data"));

        mockMvc.perform(get("/api/v1/dashboard/upcoming-deadlines")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Review dashboard data"));
    }

    @Test
    void dashboardEndpointsRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/summary"))
                .andExpect(status().isUnauthorized());
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new RegisterRequest("Dash", "User", email, "Password1")
                        )))
                .andExpect(status().isCreated());
    }

    private String loginAndGetToken(String email, String password) throws Exception {
        String response = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest(email, password))))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).path("data").path("accessToken").asText();
    }

    private long getCurrentUserId(String token) throws Exception {
        String response = mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).path("data").path("user").path("id").asLong();
    }

    private long createProject(String token, String key, String name) throws Exception {
        String response = mockMvc.perform(post("/api/v1/projects")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new CreateProjectRequest(name, key, "Dashboard workspace")
                        )))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).path("data").path("id").asLong();
    }

    private long createTask(String token, long projectId, String title, TaskPriority priority, LocalDate dueDate) throws Exception {
        String response = mockMvc.perform(post("/api/v1/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new CreateTaskRequest(projectId, title, "Task description", priority, dueDate)
                        )))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(response);
        return json.path("data").path("id").asLong();
    }
}
