package com.ruhatkaratas.commercecore.order;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.commercecore.customer.Customer;
import com.ruhatkaratas.commercecore.customer.CustomerRepository;
import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import com.ruhatkaratas.commercecore.stock.StockMovementRepository;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class OrderControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Test
    void fulfilledOrderDeductsStockAndCreatesStockMovementOnce() throws Exception {
        Customer customer = customerRepository.save(customer("order.fulfilled@example.com"));
        Product product = productRepository.save(product("ORDER-FULFILL-001", 10));
        long orderId = createOrder(customer.getId(), product.getId(), 3);
        long movementCountBeforeFulfillment = stockMovementRepository.count();

        UpdateOrderStatusRequest request = new UpdateOrderStatusRequest(OrderStatus.FULFILLED);
        mockMvc.perform(put("/api/v1/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("FULFILLED"));

        Product fulfilledProduct = productRepository.findById(product.getId()).orElseThrow();
        assertThat(fulfilledProduct.getStockQuantity()).isEqualTo(7);
        assertThat(stockMovementRepository.count()).isEqualTo(movementCountBeforeFulfillment + 1);

        mockMvc.perform(put("/api/v1/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("FULFILLED"));

        Product refetchedProduct = productRepository.findById(product.getId()).orElseThrow();
        assertThat(refetchedProduct.getStockQuantity()).isEqualTo(7);
        assertThat(stockMovementRepository.count()).isEqualTo(movementCountBeforeFulfillment + 1);
    }

    @Test
    void rejectsFulfillmentWhenStockIsTooLow() throws Exception {
        Customer customer = customerRepository.save(customer("order.lowstock@example.com"));
        Product product = productRepository.save(product("ORDER-FULFILL-LOW-001", 1));
        long orderId = createOrder(customer.getId(), product.getId(), 2);

        UpdateOrderStatusRequest request = new UpdateOrderStatusRequest(OrderStatus.FULFILLED);
        mockMvc.perform(put("/api/v1/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    private long createOrder(Long customerId, Long productId, int quantity) throws Exception {
        CreateOrderRequest request = new CreateOrderRequest(
                customerId,
                List.of(new OrderItemRequest(productId, quantity))
        );
        String response = mockMvc.perform(post("/api/v1/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(response);
        return json.path("data").path("id").asLong();
    }

    private Customer customer(String email) {
        Customer customer = new Customer();
        customer.setFirstName("Order");
        customer.setLastName("Customer");
        customer.setEmail(email);
        customer.setPhone("+90 555 010 9090");
        return customer;
    }

    private Product product(String sku, int stockQuantity) {
        Product product = new Product();
        product.setSku(sku);
        product.setName("Order Test Product");
        product.setDescription("Product used by order fulfillment tests");
        product.setPrice(new BigDecimal("59.90"));
        product.setStockQuantity(stockQuantity);
        product.setLowStockThreshold(2);
        product.setActive(true);
        return product;
    }
}
