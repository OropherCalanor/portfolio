package com.ruhatkaratas.taskflow.dashboard.service;

import com.ruhatkaratas.taskflow.dashboard.dto.DashboardSummaryResponse;
import com.ruhatkaratas.taskflow.dashboard.dto.DashboardTaskItem;
import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getSummary(String currentUserEmail);

    List<DashboardTaskItem> getMyTasks(String currentUserEmail);

    List<DashboardTaskItem> getUpcomingDeadlines(String currentUserEmail);
}

