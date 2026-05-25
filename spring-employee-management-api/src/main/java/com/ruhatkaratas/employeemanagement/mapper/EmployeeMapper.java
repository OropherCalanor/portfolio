package com.ruhatkaratas.employeemanagement.mapper;

import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeResponse;
import com.ruhatkaratas.employeemanagement.dto.employee.EmployeeSummaryResponse;
import com.ruhatkaratas.employeemanagement.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    @Mapping(target = "departmentId", source = "department.id")
    @Mapping(target = "departmentName", source = "department.name")
    @Mapping(target = "positionId", source = "position.id")
    @Mapping(target = "positionTitle", source = "position.title")
    EmployeeResponse toResponse(Employee employee);

    @Mapping(target = "departmentName", source = "department.name")
    @Mapping(target = "positionTitle", source = "position.title")
    EmployeeSummaryResponse toSummaryResponse(Employee employee);
}

