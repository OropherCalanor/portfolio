package com.ruhatkaratas.taskflow.common.config;

import com.ruhatkaratas.taskflow.auth.entity.Role;
import com.ruhatkaratas.taskflow.auth.entity.RoleName;
import com.ruhatkaratas.taskflow.auth.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        seedRole(RoleName.ROLE_ADMIN);
        seedRole(RoleName.ROLE_MANAGER);
        seedRole(RoleName.ROLE_MEMBER);
    }

    private void seedRole(RoleName roleName) {
        roleRepository.findByName(roleName).orElseGet(() -> {
            Role role = new Role();
            role.setName(roleName);
            return roleRepository.save(role);
        });
    }
}
