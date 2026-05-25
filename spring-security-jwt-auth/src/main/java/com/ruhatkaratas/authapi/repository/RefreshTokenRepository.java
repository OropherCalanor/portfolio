package com.ruhatkaratas.authapi.repository;

import com.ruhatkaratas.authapi.entity.RefreshToken;
import com.ruhatkaratas.authapi.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    List<RefreshToken> findAllByUserAndRevokedFalse(User user);
}
