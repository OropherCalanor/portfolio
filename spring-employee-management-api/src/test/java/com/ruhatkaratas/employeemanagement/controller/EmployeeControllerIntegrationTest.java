package com.ruhatkaratas.employeemanagement.controller;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeCreateRequest;
import com.ruhatkaratas.employeemanagement.entity.Department;
import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import com.ruhatkaratas.employeemanagement.entity.Position;
import com.ruhatkaratas.employeemanagement.repository.DepartmentRepository;
import com.ruhatkaratas.employeemanagement.repository.PositionRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class EmployeeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    private Department department;
    private Position position;

    @BeforeEach
    void setUp() {
        department = new Department();
        department.setName("Engineering");
        department.setDescription("Platform engineering team");
        department = departmentRepository.save(department);

        position = new Position();
        position.setTitle("Software Engineer");
        position.setDescription("Builds product features");
        position = positionRepository.save(position);
    }

    @Test
    void shouldCreateEmployeeSuccessfully() throws Exception {
        EmployeeCreateRequest request = new EmployeeCreateRequest(
                "Ada",
                "Lovelace",
                "ada.lovelace@example.com",
                "+90-555-000-0000",
                new BigDecimal("85000.00"),
                LocalDate.of(2024, 1, 15),
                EmploymentStatus.ACTIVE,
                department.getId(),
                position.getId()
        );

        mockMvc.perform(post("/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.email", is("ada.lovelace@example.com")))
                .andExpect(jsonPath("$.data.departmentName", is("Engineering")))
                .andExpect(jsonPath("$.data.positionTitle", is("Software Engineer")));
    }

    @Test
    void shouldFilterEmployeesByStatus() throws Exception {
        EmployeeCreateRequest request = new EmployeeCreateRequest(
                "Ada",
                "Lovelace",
                "ada.filter@example.com",
                "+90-555-000-0000",
                new BigDecimal("85000.00"),
                LocalDate.of(2024, 1, 15),
                EmploymentStatus.ACTIVE,
                department.getId(),
                position.getId()
        );

        mockMvc.perform(post("/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/employees")
                        .param("status", "ACTIVE")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.content.length()", is(1)))
                .andExpect(jsonPath("$.content[0].email", is("ada.filter@example.com")));
    }

    @Test
    void shouldRejectInvalidStatusFilter() throws Exception {
        mockMvc.perform(get("/api/v1/employees")
                        .param("status", "INVALID")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Invalid employment status: INVALID")));
    }
}

