package com.ruhatkaratas.authapi.service.impl;

import com.ruhatkaratas.authapi.dto.user.UserResponse;
import com.ruhatkaratas.authapi.entity.User;
import com.ruhatkaratas.authapi.exception.ResourceNotFoundException;
import com.ruhatkaratas.authapi.repository.UserRepository;
import com.ruhatkaratas.authapi.service.UserService;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.isEnabled(),
                user.isAccountNonLocked(),
                user.getRoles().stream()
                        .map(role -> role.getName().name())
                        .collect(Collectors.toSet()),
                user.getCreatedAt()
        );
    }
}
