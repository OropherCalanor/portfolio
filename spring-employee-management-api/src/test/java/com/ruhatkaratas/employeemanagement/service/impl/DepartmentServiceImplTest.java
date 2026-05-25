package com.ruhatkaratas.employeemanagement.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ruhatkaratas.employeemanagement.dto.department.DepartmentCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.department.DepartmentResponse;
import com.ruhatkaratas.employeemanagement.entity.Department;
import com.ruhatkaratas.employeemanagement.exception.BadRequestException;
import com.ruhatkaratas.employeemanagement.exception.DuplicateResourceException;
import com.ruhatkaratas.employeemanagement.mapper.DepartmentMapper;
import com.ruhatkaratas.employeemanagement.repository.DepartmentRepository;
import com.ruhatkaratas.employeemanagement.repository.EmployeeRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class DepartmentServiceImplTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentMapper departmentMapper;

    @InjectMocks
    private DepartmentServiceImpl departmentService;

    private Department department;

    @BeforeEach
    void setUp() {
        department = new Department();
        department.setId(1L);
        department.setName("Engineering");
        department.setDescription("Engineering team");
        department.setCreatedAt(LocalDateTime.now());
        department.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void shouldCreateDepartmentWhenNameIsUnique() {
        DepartmentCreateRequest request = new DepartmentCreateRequest("Engineering", "Engineering team");
        DepartmentResponse response = new DepartmentResponse(1L, "Engineering", "Engineering team", department.getCreatedAt(), department.getUpdatedAt());

        when(departmentRepository.findByNameIgnoreCase("Engineering")).thenReturn(Optional.empty());
        when(departmentRepository.save(any(Department.class))).thenReturn(department);
        when(departmentMapper.toResponse(department)).thenReturn(response);

        DepartmentResponse result = departmentService.createDepartment(request);

        assertEquals("Engineering", result.name());
        verify(departmentRepository).save(any(Department.class));
    }

    @Test
    void shouldThrowWhenDepartmentNameAlreadyExists() {
        DepartmentCreateRequest request = new DepartmentCreateRequest("Engineering", "Engineering team");

        when(departmentRepository.findByNameIgnoreCase("Engineering")).thenReturn(Optional.of(department));

        assertThrows(DuplicateResourceException.class, () -> departmentService.createDepartment(request));
        verify(departmentRepository, never()).save(any(Department.class));
    }

    @Test
    void shouldPreventDeleteWhenDepartmentHasEmployees() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.countByDepartmentId(1L)).thenReturn(2L);

        assertThrows(BadRequestException.class, () -> departmentService.deleteDepartment(1L));
    }
}

