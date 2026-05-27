package com.ruhatkaratas.taskflow.dashboard.dto;

import java.util.List;
import java.util.Map;

public record DashboardSummaryResponse(
        long projectCount,
        long assignedTaskCount,
        Map<String, Long> tasksByStatus,
        Map<String, Long> tasksByPriority,
        List<DashboardTaskItem> upcomingDeadlines
) {
}

