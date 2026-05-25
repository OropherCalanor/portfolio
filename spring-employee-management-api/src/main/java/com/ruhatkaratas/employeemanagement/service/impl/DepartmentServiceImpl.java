package com.ruhatkaratas.employeemanagement.service.impl;

import com.ruhatkaratas.employeemanagement.dto.department.DepartmentCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.department.DepartmentResponse;
import com.ruhatkaratas.employeemanagement.dto.department.DepartmentUpdateRequest;
import com.ruhatkaratas.employeemanagement.entity.Department;
import com.ruhatkaratas.employeemanagement.exception.BadRequestException;
import com.ruhatkaratas.employeemanagement.exception.DuplicateResourceException;
import com.ruhatkaratas.employeemanagement.exception.ResourceNotFoundException;
import com.ruhatkaratas.employeemanagement.mapper.DepartmentMapper;
import com.ruhatkaratas.employeemanagement.repository.DepartmentRepository;
import com.ruhatkaratas.employeemanagement.repository.EmployeeRepository;
import com.ruhatkaratas.employeemanagement.service.DepartmentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    public DepartmentResponse createDepartment(DepartmentCreateRequest request) {
        validateDepartmentName(request.name(), null);

        Department department = new Department();
        department.setName(request.name().trim());
        department.setDescription(request.description());

        return departmentMapper.toResponse(departmentRepository.save(department));
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartmentById(Long id) {
        return departmentMapper.toResponse(findDepartmentById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(departmentMapper::toResponse)
                .toList();
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentUpdateRequest request) {
        Department department = findDepartmentById(id);
        validateDepartmentName(request.name(), id);

        department.setName(request.name().trim());
        department.setDescription(request.description());

        return departmentMapper.toResponse(departmentRepository.save(department));
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department = findDepartmentById(id);

        if (employeeRepository.countByDepartmentId(id) > 0) {
            throw new BadRequestException("Department cannot be deleted because it is assigned to one or more employees");
        }

        departmentRepository.delete(department);
    }

    private Department findDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    private void validateDepartmentName(String name, Long currentDepartmentId) {
        departmentRepository.findByNameIgnoreCase(name.trim())
                .filter(existing -> !existing.getId().equals(currentDepartmentId))
                .ifPresent(existing -> {
                    throw new DuplicateResourceException("Department name already exists: " + name);
                });
    }
}
