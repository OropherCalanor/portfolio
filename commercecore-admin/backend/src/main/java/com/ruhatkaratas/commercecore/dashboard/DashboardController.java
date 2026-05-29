package com.ruhatkaratas.commercecore.dashboard;

import com.ruhatkaratas.commercecore.category.CategoryRepository;
import com.ruhatkaratas.commercecore.common.ApiResponse;
import com.ruhatkaratas.commercecore.customer.CustomerRepository;
import com.ruhatkaratas.commercecore.order.OrderRepository;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> summary() {
        DashboardSummaryResponse response = new DashboardSummaryResponse(
                productRepository.count(),
                categoryRepository.count(),
                customerRepository.count(),
                orderRepository.count(),
                productRepository.countByStockQuantityLessThanEqual(5)
        );
        return ResponseEntity.ok(ApiResponse.success("Dashboard summary retrieved", response));
    }
}
