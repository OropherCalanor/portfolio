package com.ruhatkaratas.employeemanagement.mapper;

import com.ruhatkaratas.employeemanagement.dto.department.DepartmentResponse;
import com.ruhatkaratas.employeemanagement.entity.Department;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DepartmentMapper {

    DepartmentResponse toResponse(Department department);
}

