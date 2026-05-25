package com.ruhatkaratas.employeemanagement.controller;

import com.ruhatkaratas.employeemanagement.dto.common.ApiResponse;
import com.ruhatkaratas.employeemanagement.dto.position.PositionCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.position.PositionResponse;
import com.ruhatkaratas.employeemanagement.dto.position.PositionUpdateRequest;
import com.ruhatkaratas.employeemanagement.service.PositionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/positions")
@RequiredArgsConstructor
@Tag(name = "Positions", description = "Position management endpoints")
public class PositionController {

    private final PositionService positionService;

    @PostMapping
    @Operation(summary = "Create position")
    public ResponseEntity<ApiResponse<PositionResponse>> createPosition(
            @Valid @RequestBody PositionCreateRequest request
    ) {
        PositionResponse response = positionService.createPosition(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Position created successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get position by id")
    public ResponseEntity<ApiResponse<PositionResponse>> getPositionById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Position fetched successfully",
                positionService.getPositionById(id)
        ));
    }

    @GetMapping
    @Operation(summary = "List positions")
    public ResponseEntity<ApiResponse<List<PositionResponse>>> getAllPositions() {
        return ResponseEntity.ok(ApiResponse.success(
                "Positions fetched successfully",
                positionService.getAllPositions()
        ));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update position")
    public ResponseEntity<ApiResponse<PositionResponse>> updatePosition(
            @PathVariable Long id,
            @Valid @RequestBody PositionUpdateRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Position updated successfully",
                positionService.updatePosition(id, request)
        ));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete position")
    public ResponseEntity<ApiResponse<Void>> deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
        return ResponseEntity.ok(ApiResponse.success("Position deleted successfully"));
    }
}
