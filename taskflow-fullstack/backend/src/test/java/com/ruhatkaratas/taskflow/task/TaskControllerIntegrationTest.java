package com.ruhatkaratas.taskflow.task;

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
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void authenticatedMemberCanCreateListAndUpdateTasks() throws Exception {
        register("tasker@example.com");
        String token = loginAndGetToken("tasker@example.com", "Password1");
        long userId = getCurrentUserId(token);
        long projectId = createProject(token);

        String createTaskResponse = mockMvc.perform(post("/api/v1/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new CreateTaskRequest(
                                        projectId,
                                        "Build Task module",
                                        "Implement task CRUD foundation",
                                        TaskPriority.HIGH,
                                        LocalDate.of(2026, 6, 5)
                                )
                        )))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value("Build Task module"))
                .andExpect(jsonPath("$.data.status").value("TODO"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode taskJson = objectMapper.readTree(createTaskResponse);
        long taskId = taskJson.path("data").path("id").asLong();

        mockMvc.perform(get("/api/v1/tasks")
                        .header("Authorization", "Bearer " + token)
                        .param("projectId", String.valueOf(projectId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Build Task module"));

        mockMvc.perform(patch("/api/v1/tasks/" + taskId + "/status")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new UpdateTaskStatusRequest(TaskStatus.IN_PROGRESS))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("IN_PROGRESS"));

        mockMvc.perform(patch("/api/v1/tasks/" + taskId + "/assignee")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AssignTaskRequest(userId))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.assigneeId").value(userId));
    }

    @Test
    void taskEndpointsRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/tasks").param("projectId", "1"))
                .andExpect(status().isUnauthorized());
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new RegisterRequest("Task", "Member", email, "Password1")
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

    private long createProject(String token) throws Exception {
        String response = mockMvc.perform(post("/api/v1/projects")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new CreateProjectRequest("TaskFlow Board", "TASKS", "Task workspace")
                        )))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).path("data").path("id").asLong();
    }
}
