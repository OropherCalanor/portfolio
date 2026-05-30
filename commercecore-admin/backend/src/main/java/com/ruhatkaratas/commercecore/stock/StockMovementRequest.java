package com.ruhatkaratas.commercecore.stock;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StockMovementRequest(
        @NotNull Long productId,
        @NotNull StockMovementType type,
        int quantity,
        @Size(max = 1000) String note
) {
}
