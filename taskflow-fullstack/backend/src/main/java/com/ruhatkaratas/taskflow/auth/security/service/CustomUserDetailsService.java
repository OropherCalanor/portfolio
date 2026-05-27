package com.ruhatkaratas.taskflow.auth.security.service;

import com.ruhatkaratas.taskflow.auth.security.CustomUserDetails;
import com.ruhatkaratas.taskflow.common.exception.ResourceNotFoundException;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmailIgnoreCase(username)
                .map(CustomUserDetails::new)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

