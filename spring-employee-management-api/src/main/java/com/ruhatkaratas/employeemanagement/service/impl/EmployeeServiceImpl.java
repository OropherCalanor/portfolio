package com.ruhatkaratas.employeemanagement.service.impl;

import com.ruhatkaratas.employeemanagement.dto.common.PagedResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeSummaryResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeUpdateRequest;
import com.ruhatkaratas.employeemanagement.entity.Department;
import com.ruhatkaratas.employeemanagement.entity.Employee;
import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import com.ruhatkaratas.employeemanagement.entity.Position;
import com.ruhatkaratas.employeemanagement.exception.BadRequestException;
import com.ruhatkaratas.employeemanagement.exception.DuplicateResourceException;
import com.ruhatkaratas.employeemanagement.exception.ResourceNotFoundException;
import com.ruhatkaratas.employeemanagement.mapper.EmployeeMapper;
import com.ruhatkaratas.employeemanagement.repository.DepartmentRepository;
import com.ruhatkaratas.employeemanagement.repository.EmployeeRepository;
import com.ruhatkaratas.employeemanagement.repository.PositionRepository;
import com.ruhatkaratas.employeemanagement.service.EmployeeService;
import com.ruhatkaratas.employeemanagement.specification.EmployeeSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private static final String SORT_DIRECTION_DESC = "desc";
    private static final java.util.Set<String> ALLOWED_SORT_FIELDS = java.util.Set.of(
            "id",
            "firstName",
            "lastName",
            "email",
            "hireDate",
            "salary",
            "employmentStatus"
    );

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeResponse createEmployee(EmployeeCreateRequest request) {
        validateUniqueEmail(request.email(), null);

        Department department = findDepartmentById(request.departmentId());
        Position position = findPositionById(request.positionId());

        Employee employee = new Employee();
        applyEmployeeValues(employee, request, department, position);

        return employeeMapper.toResponse(employeeRepository.save(employee));
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(Long id) {
        return employeeMapper.toResponse(findEmployeeById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeSummaryResponse> getEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir,
            Long departmentId,
            Long positionId,
            String status,
            String search
    ) {
        validateStatusFilter(status);
        validateSortField(sortBy);

        Sort.Direction direction = SORT_DIRECTION_DESC.equalsIgnoreCase(sortDir)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Employee> employeePage = employeeRepository.findAll(
                EmployeeSpecification.withFilters(departmentId, positionId, status, search),
                pageable
        );

        return PagedResponse.success(
                "Employees fetched successfully",
                employeePage.getContent().stream().map(employeeMapper::toSummaryResponse).toList(),
                employeePage.getNumber(),
                employeePage.getSize(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages(),
                employeePage.isFirst(),
                employeePage.isLast()
        );
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeUpdateRequest request) {
        Employee employee = findEmployeeById(id);
        validateUniqueEmail(request.email(), id);

        Department department = findDepartmentById(request.departmentId());
        Position position = findPositionById(request.positionId());

        applyEmployeeValues(employee, request, department, position);

        return employeeMapper.toResponse(employeeRepository.save(employee));
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = findEmployeeById(id);
        employeeRepository.delete(employee);
    }

    private void applyEmployeeValues(
            Employee employee,
            EmployeeCreateRequest request,
            Department department,
            Position position
    ) {
        employee.setFirstName(request.firstName().trim());
        employee.setLastName(request.lastName().trim());
        employee.setEmail(request.email().trim().toLowerCase());
        employee.setPhoneNumber(request.phoneNumber());
        employee.setSalary(request.salary());
        employee.setHireDate(request.hireDate());
        employee.setEmploymentStatus(request.employmentStatus());
        employee.setDepartment(department);
        employee.setPosition(position);
    }

    private void applyEmployeeValues(
            Employee employee,
            EmployeeUpdateRequest request,
            Department department,
            Position position
    ) {
        employee.setFirstName(request.firstName().trim());
        employee.setLastName(request.lastName().trim());
        employee.setEmail(request.email().trim().toLowerCase());
        employee.setPhoneNumber(request.phoneNumber());
        employee.setSalary(request.salary());
        employee.setHireDate(request.hireDate());
        employee.setEmploymentStatus(request.employmentStatus());
        employee.setDepartment(department);
        employee.setPosition(position);
    }

    private Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    private Department findDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    private Position findPositionById(Long id) {
        return positionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Position not found with id: " + id));
    }

    private void validateUniqueEmail(String email, Long currentEmployeeId) {
        String normalizedEmail = email.trim().toLowerCase();

        employeeRepository.findByEmailIgnoreCase(normalizedEmail)
                .filter(existing -> !existing.getId().equals(currentEmployeeId))
                .ifPresent(existing -> {
                    throw new DuplicateResourceException("Employee email already exists: " + normalizedEmail);
                });
    }

    private void validateStatusFilter(String status) {
        if (status == null || status.isBlank()) {
            return;
        }

        try {
            EmploymentStatus.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new BadRequestException("Invalid employment status: " + status);
        }
    }

    private void validateSortField(String sortBy) {
        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new BadRequestException("Invalid sort field: " + sortBy);
        }
    }
}
