package com.ruhatkaratas.commercecore.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank @Size(max = 80) String sku,
        @NotBlank @Size(max = 160) String name,
        @Size(max = 2000) String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @Min(0) int stockQuantity,
        @Min(0) int lowStockThreshold,
        boolean active,
        Long categoryId
) {
}
