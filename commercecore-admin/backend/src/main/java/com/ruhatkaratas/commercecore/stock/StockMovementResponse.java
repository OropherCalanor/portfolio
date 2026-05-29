package com.ruhatkaratas.commercecore.stock;

public record StockMovementResponse(
        Long id,
        Long productId,
        String productName,
        StockMovementType type,
        int quantity,
        String note
) {
}
