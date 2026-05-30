package com.ruhatkaratas.commercecore.stock;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class StockControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void createsStockMovementAndUpdatesProductQuantity() throws Exception {
        Product product = productRepository.save(product("STOCK-IN-001", 5));
        StockMovementRequest request = new StockMovementRequest(
                product.getId(),
                StockMovementType.IN,
                7,
                "Supplier restock"
        );

        mockMvc.perform(post("/api/v1/stock/movements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.productName").value("Stock Test Product"))
                .andExpect(jsonPath("$.data.quantity").value(7));

        Product updatedProduct = productRepository.findById(product.getId()).orElseThrow();
        assertThat(updatedProduct.getStockQuantity()).isEqualTo(12);
    }

    @Test
    void rejectsMovementThatWouldMakeStockNegative() throws Exception {
        Product product = productRepository.save(product("STOCK-OUT-001", 3));
        StockMovementRequest request = new StockMovementRequest(
                product.getId(),
                StockMovementType.OUT,
                4,
                "Oversell attempt"
        );

        mockMvc.perform(post("/api/v1/stock/movements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    private Product product(String sku, int stockQuantity) {
        Product product = new Product();
        product.setSku(sku);
        product.setName("Stock Test Product");
        product.setDescription("Product used by stock movement tests");
        product.setPrice(new BigDecimal("19.90"));
        product.setStockQuantity(stockQuantity);
        product.setLowStockThreshold(2);
        product.setActive(true);
        return product;
    }
}
