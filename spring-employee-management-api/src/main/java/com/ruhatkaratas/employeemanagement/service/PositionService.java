package com.ruhatkaratas.employeemanagement.service;

import com.ruhatkaratas.employeemanagement.dto.position.PositionCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.position.PositionResponse;
import com.ruhatkaratas.employeemanagement.dto.position.PositionUpdateRequest;
import java.util.List;

public interface PositionService {

    PositionResponse createPosition(PositionCreateRequest request);

    PositionResponse getPositionById(Long id);

    List<PositionResponse> getAllPositions();

    PositionResponse updatePosition(Long id, PositionUpdateRequest request);

    void deletePosition(Long id);
}

