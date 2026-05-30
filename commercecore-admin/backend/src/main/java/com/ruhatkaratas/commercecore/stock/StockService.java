package com.ruhatkaratas.commercecore.stock;

import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class StockService {

    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;

    public List<StockMovementResponse> listMovements() {
        return stockMovementRepository.findAll().stream().map(this::toResponse).toList();
    }

    public StockMovementResponse createMovement(StockMovementRequest request) {
        if (request.quantity() == 0) {
            throw new IllegalArgumentException("Stock movement quantity cannot be zero");
        }

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        int nextStockQuantity = calculateNextStockQuantity(product.getStockQuantity(), request);
        if (nextStockQuantity < 0) {
            throw new IllegalArgumentException("Stock movement cannot make product stock negative");
        }

        product.setStockQuantity(nextStockQuantity);

        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setType(request.type());
        movement.setQuantity(request.quantity());
        movement.setNote(request.note());

        return toResponse(stockMovementRepository.save(movement));
    }

    private int calculateNextStockQuantity(int currentStockQuantity, StockMovementRequest request) {
        return switch (request.type()) {
            case IN -> currentStockQuantity + Math.abs(request.quantity());
            case OUT -> currentStockQuantity - Math.abs(request.quantity());
            case ADJUSTMENT -> currentStockQuantity + request.quantity();
        };
    }

    private StockMovementResponse toResponse(StockMovement movement) {
        return new StockMovementResponse(
                movement.getId(),
                movement.getProduct().getId(),
                movement.getProduct().getName(),
                movement.getType(),
                movement.getQuantity(),
                movement.getNote()
        );
    }
}
