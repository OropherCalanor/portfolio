package com.ruhatkaratas.commercecore.dashboard;

public record DashboardSummaryResponse(
        long productCount,
        long categoryCount,
        long customerCount,
        long orderCount,
        long lowStockProductCount
) {
}
