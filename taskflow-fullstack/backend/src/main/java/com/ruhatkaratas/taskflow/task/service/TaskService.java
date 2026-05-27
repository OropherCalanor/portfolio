package com.ruhatkaratas.taskflow.task.service;

import com.ruhatkaratas.taskflow.task.dto.AssignTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.CreateTaskRequest;
import com.ruhatkaratas.taskflow.task.dto.TaskResponse;
import com.ruhatkaratas.taskflow.task.dto.UpdateTaskStatusRequest;
import java.util.List;

public interface TaskService {

    TaskResponse createTask(CreateTaskRequest request, String currentUserEmail);

    List<TaskResponse> getTasksByProject(Long projectId, String currentUserEmail);

    TaskResponse updateTaskStatus(Long taskId, UpdateTaskStatusRequest request, String currentUserEmail);

    TaskResponse assignTask(Long taskId, AssignTaskRequest request, String currentUserEmail);
}

