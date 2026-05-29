package com.ruhatkaratas.commercecore.order;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,
        OrderStatus status,
        BigDecimal totalAmount,
        Long customerId,
        String customerName,
        List<OrderItemResponse> items
) {
}
