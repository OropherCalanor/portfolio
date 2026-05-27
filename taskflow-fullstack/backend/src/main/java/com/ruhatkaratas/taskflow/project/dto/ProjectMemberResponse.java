package com.ruhatkaratas.taskflow.project.dto;

import com.ruhatkaratas.taskflow.project.entity.MembershipRole;
import java.time.LocalDateTime;

public record ProjectMemberResponse(
        Long userId,
        String firstName,
        String lastName,
        String email,
        MembershipRole membershipRole,
        LocalDateTime joinedAt
) {
}
