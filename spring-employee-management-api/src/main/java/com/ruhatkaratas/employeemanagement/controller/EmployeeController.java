package com.ruhatkaratas.employeemanagement.controller;

import com.ruhatkaratas.employeemanagement.dto.common.ApiResponse;
import com.ruhatkaratas.employeemanagement.dto.common.PagedResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeSummaryResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeUpdateRequest;
import com.ruhatkaratas.employeemanagement.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Validated
@Tag(name = "Employees", description = "Employee management endpoints")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @Operation(summary = "Create employee", description = "Creates a new employee linked to a department and position")
    public ResponseEntity<ApiResponse<EmployeeResponse>> createEmployee(
            @Valid @RequestBody EmployeeCreateRequest request
    ) {
        EmployeeResponse response = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee created successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by id", description = "Fetches a single employee by its identifier")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Employee fetched successfully",
                employeeService.getEmployeeById(id)
        ));
    }

    @GetMapping
    @Operation(summary = "List employees", description = "Returns paginated employees with optional filtering, search, and sorting")
    public ResponseEntity<PagedResponse<EmployeeSummaryResponse>> getEmployees(
            @Parameter(description = "Zero-based page index")
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "Page size between 1 and 100")
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size,
            @Parameter(description = "Allowed values: id, firstName, lastName, email, hireDate, salary, employmentStatus")
            @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction: asc or desc")
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) Long positionId,
            @Parameter(description = "Allowed values: ACTIVE, ON_LEAVE, TERMINATED")
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(employeeService.getEmployees(
                page,
                size,
                sortBy,
                sortDir,
                departmentId,
                positionId,
                status,
                search
        ));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update employee", description = "Updates an existing employee")
    public ResponseEntity<ApiResponse<EmployeeResponse>> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeUpdateRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Employee updated successfully",
                employeeService.updateEmployee(id, request)
        ));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee", description = "Deletes an employee by id")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(ApiResponse.success("Employee deleted successfully"));
    }
}
