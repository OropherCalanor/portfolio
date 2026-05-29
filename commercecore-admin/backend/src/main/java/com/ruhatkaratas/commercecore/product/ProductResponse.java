package com.ruhatkaratas.commercecore.product;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String sku,
        String name,
        String description,
        BigDecimal price,
        int stockQuantity,
        int lowStockThreshold,
        boolean active,
        Long categoryId,
        String categoryName
) {
}
