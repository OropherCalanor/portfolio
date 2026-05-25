package com.ruhatkaratas.employeemanagement.dto.employee;

import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmployeeResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        BigDecimal salary,
        LocalDate hireDate,
        EmploymentStatus employmentStatus,
        Long departmentId,
        String departmentName,
        Long positionId,
        String positionTitle,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

