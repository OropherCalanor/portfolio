package com.ruhatkaratas.taskflow.auth.service.impl;

import com.ruhatkaratas.taskflow.auth.dto.AuthResponse;
import com.ruhatkaratas.taskflow.auth.dto.CurrentUserResponse;
import com.ruhatkaratas.taskflow.auth.dto.LoginRequest;
import com.ruhatkaratas.taskflow.auth.dto.LogoutRequest;
import com.ruhatkaratas.taskflow.auth.dto.RegisterRequest;
import com.ruhatkaratas.taskflow.auth.dto.UserResponse;
import com.ruhatkaratas.taskflow.auth.entity.RefreshToken;
import com.ruhatkaratas.taskflow.auth.entity.Role;
import com.ruhatkaratas.taskflow.auth.entity.RoleName;
import com.ruhatkaratas.taskflow.auth.repository.RefreshTokenRepository;
import com.ruhatkaratas.taskflow.auth.repository.RoleRepository;
import com.ruhatkaratas.taskflow.auth.security.CustomUserDetails;
import com.ruhatkaratas.taskflow.auth.security.jwt.JwtProperties;
import com.ruhatkaratas.taskflow.auth.security.jwt.JwtService;
import com.ruhatkaratas.taskflow.auth.service.AuthService;
import com.ruhatkaratas.taskflow.common.exception.DuplicateResourceException;
import com.ruhatkaratas.taskflow.common.exception.ResourceNotFoundException;
import com.ruhatkaratas.taskflow.common.exception.UnauthorizedException;
import com.ruhatkaratas.taskflow.user.entity.User;
import com.ruhatkaratas.taskflow.user.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
@lombok.RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("Email is already in use");
        }

        Role defaultRole = roleRepository.findByName(RoleName.ROLE_MEMBER)
                .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));

        User user = new User();
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(defaultRole));

        User savedUser = userRepository.save(user);
        CustomUserDetails userDetails = new CustomUserDetails(savedUser);
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = createRefreshToken(savedUser);

        return new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                jwtProperties.accessTokenExpirationMs(),
                mapToUserResponse(savedUser)
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(normalizedEmail, request.password())
        );

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = createRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                jwtProperties.accessTokenExpirationMs(),
                mapToUserResponse(user)
        );
    }

    @Override
    public void logout(LogoutRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.refreshToken())
                .orElseThrow(() -> new UnauthorizedException("Refresh token is invalid"));

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    @Transactional(readOnly = true)
    public CurrentUserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new CurrentUserResponse(mapToUserResponse(user));
    }

    private String createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(LocalDateTime.now().plusNanos(jwtProperties.refreshTokenExpirationMs() * 1_000_000));
        refreshToken.setRevoked(false);
        refreshToken.setUser(user);
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()),
                user.getCreatedAt()
        );
    }
}
