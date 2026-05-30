package com.ruhatkaratas.commercecore.stock;

import com.ruhatkaratas.commercecore.common.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping("/movements")
    public ResponseEntity<ApiResponse<List<StockMovementResponse>>> movements() {
        return ResponseEntity.ok(ApiResponse.success("Stock movements retrieved", stockService.listMovements()));
    }

    @PostMapping("/movements")
    public ResponseEntity<ApiResponse<StockMovementResponse>> createMovement(
            @Valid @RequestBody StockMovementRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Stock movement created", stockService.createMovement(request)));
    }
}
