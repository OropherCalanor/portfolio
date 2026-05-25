package com.ruhatkaratas.employeemanagement.specification;

import com.ruhatkaratas.employeemanagement.entity.Employee;
import com.ruhatkaratas.employeemanagement.entity.EmploymentStatus;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public final class EmployeeSpecification {

    private EmployeeSpecification() {
    }

    public static Specification<Employee> withFilters(
            Long departmentId,
            Long positionId,
            String status,
            String search
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (departmentId != null) {
                predicates.add(criteriaBuilder.equal(root.get("department").get("id"), departmentId));
            }

            if (positionId != null) {
                predicates.add(criteriaBuilder.equal(root.get("position").get("id"), positionId));
            }

            if (status != null && !status.isBlank()) {
                predicates.add(criteriaBuilder.equal(
                        root.get("employmentStatus"),
                        EmploymentStatus.valueOf(status.trim().toUpperCase())
                ));
            }

            if (search != null && !search.isBlank()) {
                String searchTerm = "%" + search.trim().toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), searchTerm),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), searchTerm),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), searchTerm)
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

