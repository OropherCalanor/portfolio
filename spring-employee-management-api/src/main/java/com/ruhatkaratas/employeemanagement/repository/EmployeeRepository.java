package com.ruhatkaratas.employeemanagement.repository;

import com.ruhatkaratas.employeemanagement.entity.Employee;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<Employee> findByEmailIgnoreCase(String email);

    long countByDepartmentId(Long departmentId);

    long countByPositionId(Long positionId);
}
