package com.ruhatkaratas.commercecore.stock;

import com.ruhatkaratas.commercecore.common.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockMovementRepository stockMovementRepository;

    @GetMapping("/movements")
    public ResponseEntity<ApiResponse<List<StockMovementResponse>>> movements() {
        List<StockMovementResponse> movements = stockMovementRepository.findAll().stream()
                .map(movement -> new StockMovementResponse(
                        movement.getId(),
                        movement.getProduct().getId(),
                        movement.getProduct().getName(),
                        movement.getType(),
                        movement.getQuantity(),
                        movement.getNote()
                ))
                .toList();
        return ResponseEntity.ok(ApiResponse.success("Stock movements retrieved", movements));
    }
}
