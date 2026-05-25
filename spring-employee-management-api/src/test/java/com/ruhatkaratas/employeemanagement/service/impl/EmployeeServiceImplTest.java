package com.ruhatkaratas.employeemanagement.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeResponse;
import com.ruhatkaratas.employeemanagement.entity.Department;
import com.ruhatkaratas.employeemanagement.entity.Employee;
import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import com.ruhatkaratas.employeemanagement.entity.Position;
import com.ruhatkaratas.employeemanagement.exception.BadRequestException;
import com.ruhatkaratas.employeemanagement.exception.DuplicateResourceException;
import com.ruhatkaratas.employeemanagement.mapper.EmployeeMapper;
import com.ruhatkaratas.employeemanagement.repository.DepartmentRepository;
import com.ruhatkaratas.employeemanagement.repository.EmployeeRepository;
import com.ruhatkaratas.employeemanagement.repository.PositionRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private PositionRepository positionRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Department department;
    private Position position;
    private Employee employee;

    @BeforeEach
    void setUp() {
        department = new Department();
        department.setId(1L);
        department.setName("Engineering");

        position = new Position();
        position.setId(2L);
        position.setTitle("Software Engineer");

        employee = new Employee();
        employee.setId(3L);
        employee.setFirstName("Ada");
        employee.setLastName("Lovelace");
        employee.setEmail("ada@example.com");
        employee.setSalary(new BigDecimal("85000.00"));
        employee.setHireDate(LocalDate.of(2024, 1, 15));
        employee.setEmploymentStatus(EmploymentStatus.ACTIVE);
        employee.setDepartment(department);
        employee.setPosition(position);
        employee.setCreatedAt(LocalDateTime.now());
        employee.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void shouldCreateEmployeeWhenDataIsValid() {
        EmployeeCreateRequest request = new EmployeeCreateRequest(
                "Ada",
                "Lovelace",
                "ada@example.com",
                "+90-555-000-0000",
                new BigDecimal("85000.00"),
                LocalDate.of(2024, 1, 15),
                EmploymentStatus.ACTIVE,
                1L,
                2L
        );

        EmployeeResponse response = new EmployeeResponse(
                3L,
                "Ada",
                "Lovelace",
                "ada@example.com",
                "+90-555-000-0000",
                new BigDecimal("85000.00"),
                LocalDate.of(2024, 1, 15),
                EmploymentStatus.ACTIVE,
                1L,
                "Engineering",
                2L,
                "Software Engineer",
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );

        when(employeeRepository.findByEmailIgnoreCase("ada@example.com")).thenReturn(Optional.empty());
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(positionRepository.findById(2L)).thenReturn(Optional.of(position));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.toResponse(employee)).thenReturn(response);

        EmployeeResponse result = employeeService.createEmployee(request);

        assertEquals("Ada", result.firstName());
        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    void shouldThrowWhenEmailAlreadyExists() {
        EmployeeCreateRequest request = new EmployeeCreateRequest(
                "Ada",
                "Lovelace",
                "ada@example.com",
                null,
                new BigDecimal("85000.00"),
                LocalDate.of(2024, 1, 15),
                EmploymentStatus.ACTIVE,
                1L,
                2L
        );

        when(employeeRepository.findByEmailIgnoreCase("ada@example.com")).thenReturn(Optional.of(employee));

        assertThrows(DuplicateResourceException.class, () -> employeeService.createEmployee(request));
    }

    @Test
    void shouldThrowWhenStatusFilterIsInvalid() {
        assertThrows(BadRequestException.class, () -> employeeService.getEmployees(
                0,
                10,
                "id",
                "asc",
                null,
                null,
                "INVALID_STATUS",
                null
        ));
    }

    @Test
    void shouldReturnPagedEmployeesWhenFiltersAreValid() {
        when(employeeRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(new PageImpl<>(java.util.List.of(employee), PageRequest.of(0, 10), 1));
        when(employeeMapper.toSummaryResponse(employee)).thenReturn(
                new com.ruhatkaratas.employeemanagement.dto.employee.EmployeeSummaryResponse(
                        3L,
                        "Ada",
                        "Lovelace",
                        "ada@example.com",
                        EmploymentStatus.ACTIVE,
                        "Engineering",
                        "Software Engineer"
                )
        );

        var result = employeeService.getEmployees(0, 10, "id", "asc", null, null, "ACTIVE", "ada");

        assertEquals(1, result.content().size());
        assertEquals(1, result.totalElements());
    }
}
