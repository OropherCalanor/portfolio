package com.ruhatkaratas.commercecore.order;

import com.ruhatkaratas.commercecore.customer.Customer;
import com.ruhatkaratas.commercecore.customer.CustomerRepository;
import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import com.ruhatkaratas.commercecore.stock.StockMovement;
import com.ruhatkaratas.commercecore.stock.StockMovementRepository;
import com.ruhatkaratas.commercecore.stock.StockMovementType;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;

    public List<OrderResponse> list() {
        return orderRepository.findAll().stream().map(this::toResponse).toList();
    }

    public String exportCsv() {
        String header = "id,orderNumber,status,customer,totalAmount,itemCount,items";
        String rows = orderRepository.findAll().stream()
                .map(order -> String.join(",",
                        order.getId().toString(),
                        csv(order.getOrderNumber()),
                        order.getStatus().name(),
                        csv(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName()),
                        order.getTotalAmount().toPlainString(),
                        Integer.toString(order.getItems().size()),
                        csv(itemsSummary(order))
                ))
                .collect(Collectors.joining("\n"));

        return rows.isBlank() ? header + "\n" : header + "\n" + rows + "\n";
    }

    public OrderResponse create(CreateOrderRequest request) {
        Customer customer = customerRepository.findById(request.customerId())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found"));
        CustomerOrder order = new CustomerOrder();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomer(customer);

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemRequest.quantity());
            item.setUnitPrice(product.getPrice());
            item.setLineTotal(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));
            order.getItems().add(item);
            total = total.add(item.getLineTotal());
        }
        order.setTotalAmount(total);
        return toResponse(orderRepository.save(order));
    }

    public OrderResponse updateStatus(Long id, UpdateOrderStatusRequest request) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setStatus(request.status());
        if (request.status() == OrderStatus.FULFILLED && !order.isStockDeducted()) {
            deductStockForFulfillment(order);
            order.setStockDeducted(true);
        }
        return toResponse(orderRepository.save(order));
    }

    private void deductStockForFulfillment(CustomerOrder order) {
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            int nextStockQuantity = product.getStockQuantity() - item.getQuantity();
            if (nextStockQuantity < 0) {
                throw new IllegalArgumentException("Order cannot be fulfilled because product stock is too low");
            }
            product.setStockQuantity(nextStockQuantity);

            StockMovement movement = new StockMovement();
            movement.setProduct(product);
            movement.setType(StockMovementType.OUT);
            movement.setQuantity(item.getQuantity());
            movement.setNote("Order fulfillment: " + order.getOrderNumber());
            stockMovementRepository.save(movement);
        }
    }

    private OrderResponse toResponse(CustomerOrder order) {
        Customer customer = order.getCustomer();
        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getLineTotal()
                ))
                .toList();
        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getStatus(),
                order.getTotalAmount(),
                customer.getId(),
                customer.getFirstName() + " " + customer.getLastName(),
                items
        );
    }

    private String itemsSummary(CustomerOrder order) {
        return order.getItems().stream()
                .map(item -> item.getQuantity() + "x " + item.getProduct().getName())
                .collect(Collectors.joining("; "));
    }

    private String csv(String value) {
        String escaped = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + escaped + "\"";
    }
}
