package com.ruhatkaratas.commercecore.category;

public record CategoryResponse(
        Long id,
        String name,
        String slug,
        String description,
        boolean active
) {
}
