package com.ruhatkaratas.employeemanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "positions")
public class Position extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "position")
    private List<Employee> employees = new ArrayList<>();
}

