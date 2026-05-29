package com.ruhatkaratas.commercecore.customer;

public record CustomerResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phone
) {
}
