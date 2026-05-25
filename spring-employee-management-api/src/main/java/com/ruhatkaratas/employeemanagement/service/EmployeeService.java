package com.ruhatkaratas.employeemanagement.service;

import com.ruhatkaratas.employeemanagement.dto.common.PagedResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeSummaryResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeUpdateRequest;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeCreateRequest request);

    EmployeeResponse getEmployeeById(Long id);

    PagedResponse<EmployeeSummaryResponse> getEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir,
            Long departmentId,
            Long positionId,
            String status,
            String search
    );

    EmployeeResponse updateEmployee(Long id, EmployeeUpdateRequest request);

    void deleteEmployee(Long id);
}

