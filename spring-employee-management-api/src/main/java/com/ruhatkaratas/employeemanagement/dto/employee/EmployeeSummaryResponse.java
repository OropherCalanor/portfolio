package com.ruhatkaratas.employeemanagement.dto.employee;

import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;

public record EmployeeSummaryResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        EmploymentStatus employmentStatus,
        String departmentName,
        String positionTitle
) {
}

