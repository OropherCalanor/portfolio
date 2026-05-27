package com.ruhatkaratas.taskflow.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.taskflow.auth.dto.LoginRequest;
import com.ruhatkaratas.taskflow.auth.dto.LogoutRequest;
import com.ruhatkaratas.taskflow.auth.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void registerLoginAndCurrentUserFlowWorks() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "Ruhat",
                "Karatas",
                "ruhat@example.com",
                "Password1"
        );

        String registerResponse = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.user.email").value("ruhat@example.com"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode registerJson = objectMapper.readTree(registerResponse);
        String registerToken = registerJson.path("data").path("accessToken").asText();
        String refreshToken = registerJson.path("data").path("refreshToken").asText();

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + registerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.email").value("ruhat@example.com"));

        LoginRequest loginRequest = new LoginRequest("ruhat@example.com", "Password1");

        String loginResponse = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.user.email").value("ruhat@example.com"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode loginJson = objectMapper.readTree(loginResponse);
        String loginToken = loginJson.path("data").path("accessToken").asText();

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + loginToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.email").value("ruhat@example.com"));

        mockMvc.perform(post("/api/v1/auth/logout")
                        .header("Authorization", "Bearer " + loginToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LogoutRequest(refreshToken))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void meEndpointRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void loginWithUnknownUserReturnsUnauthorized() throws Exception {
        LoginRequest loginRequest = new LoginRequest("missing@example.com", "Password1");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Invalid email or password"));
    }
}
