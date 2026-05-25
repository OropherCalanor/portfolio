package com.ruhatkaratas.employeemanagement.service;

import com.ruhatkaratas.employeemanagement.dto.department.DepartmentCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.department.DepartmentResponse;
import com.ruhatkaratas.employeemanagement.dto.department.DepartmentUpdateRequest;
import java.util.List;

public interface DepartmentService {

    DepartmentResponse createDepartment(DepartmentCreateRequest request);

    DepartmentResponse getDepartmentById(Long id);

    List<DepartmentResponse> getAllDepartments();

    DepartmentResponse updateDepartment(Long id, DepartmentUpdateRequest request);

    void deleteDepartment(Long id);
}

