package com.ruhatkaratas.employeemanagement.dto.employee;

import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeUpdateRequest(
        @NotBlank(message = "First name is required")
        @Size(max = 100, message = "First name must be at most 100 characters")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100, message = "Last name must be at most 100 characters")
        String lastName,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 150, message = "Email must be at most 150 characters")
        String email,

        @Size(max = 30, message = "Phone number must be at most 30 characters")
        String phoneNumber,

        @NotNull(message = "Salary is required")
        @DecimalMin(value = "0.0", inclusive = true, message = "Salary must be zero or positive")
        BigDecimal salary,

        @NotNull(message = "Hire date is required")
        @PastOrPresent(message = "Hire date cannot be in the future")
        LocalDate hireDate,

        @NotNull(message = "Employment status is required")
        EmploymentStatus employmentStatus,

        @NotNull(message = "Department id is required")
        Long departmentId,

        @NotNull(message = "Position id is required")
        Long positionId
) {
}

