package com.ruhatkaratas.taskflow.project.dto;

import com.ruhatkaratas.taskflow.project.entity.MembershipRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddProjectMemberRequest(
        @NotBlank @Email String email,
        @NotNull MembershipRole membershipRole
) {
}
