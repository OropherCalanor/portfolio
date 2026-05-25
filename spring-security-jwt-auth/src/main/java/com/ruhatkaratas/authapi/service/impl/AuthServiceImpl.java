package com.ruhatkaratas.authapi.service.impl;

import com.ruhatkaratas.authapi.dto.auth.AuthResponse;
import com.ruhatkaratas.authapi.dto.auth.LoginRequest;
import com.ruhatkaratas.authapi.dto.auth.LogoutRequest;
import com.ruhatkaratas.authapi.dto.auth.RefreshTokenRequest;
import com.ruhatkaratas.authapi.dto.auth.RegisterRequest;
import com.ruhatkaratas.authapi.dto.user.UserResponse;
import com.ruhatkaratas.authapi.entity.RefreshToken;
import com.ruhatkaratas.authapi.entity.Role;
import com.ruhatkaratas.authapi.entity.RoleName;
import com.ruhatkaratas.authapi.entity.User;
import com.ruhatkaratas.authapi.exception.DuplicateResourceException;
import com.ruhatkaratas.authapi.exception.ResourceNotFoundException;
import com.ruhatkaratas.authapi.exception.UnauthorizedException;
import com.ruhatkaratas.authapi.repository.RefreshTokenRepository;
import com.ruhatkaratas.authapi.repository.RoleRepository;
import com.ruhatkaratas.authapi.repository.UserRepository;
import com.ruhatkaratas.authapi.security.CustomUserDetails;
import com.ruhatkaratas.authapi.security.jwt.JwtProperties;
import com.ruhatkaratas.authapi.security.jwt.JwtService;
import com.ruhatkaratas.authapi.service.AuthService;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("Email is already in use");
        }

        Role defaultRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));

        User user = new User();
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        user.setRoles(Set.of(defaultRole));

        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmailIgnoreCase(request.email())
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
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.refreshToken())
                .orElseThrow(() -> new UnauthorizedException("Refresh token is invalid"));

        if (refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token is expired or revoked");
        }

        User user = refreshToken.getUser();
        CustomUserDetails userDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateAccessToken(userDetails);

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                "Bearer",
                jwtProperties.accessTokenExpirationMs(),
                mapToUserResponse(user)
        );
    }

    @Override
    @Transactional
    public void logout(LogoutRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.refreshToken())
                .orElseThrow(() -> new UnauthorizedException("Refresh token is invalid"));

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
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
                user.isEnabled(),
                user.isAccountNonLocked(),
                user.getRoles().stream()
                        .map(role -> role.getName().name())
                        .collect(Collectors.toSet()),
                user.getCreatedAt()
        );
    }
}
