package com.ruhatkaratas.commercecore.order;

import com.ruhatkaratas.commercecore.customer.Customer;
import com.ruhatkaratas.commercecore.customer.CustomerRepository;
import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
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

    public List<OrderResponse> list() {
        return orderRepository.findAll().stream().map(this::toResponse).toList();
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
        return toResponse(orderRepository.save(order));
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
}
