package com.ruhatkaratas.commercecore.product;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruhatkaratas.commercecore.category.CategoryRequest;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createsAndListsProduct() throws Exception {
        long categoryId = createCategory("Electronics", "electronics-products");
        ProductRequest productRequest = new ProductRequest(
                "SKU-001",
                "Wireless Keyboard",
                "Compact keyboard for office setups",
                new BigDecimal("49.90"),
                18,
                5,
                true,
                categoryId
        );

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.sku").value("SKU-001"))
                .andExpect(jsonPath("$.data.categoryName").value("Electronics"));

        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void updatesAndDeletesProduct() throws Exception {
        long categoryId = createCategory("Accessories", "accessories-products");
        long productId = createProduct(new ProductRequest(
                "SKU-EDIT-001",
                "USB Hub",
                "Portable USB hub",
                new BigDecimal("29.90"),
                12,
                4,
                true,
                categoryId
        ));

        ProductRequest updateRequest = new ProductRequest(
                "SKU-EDIT-001",
                "USB-C Hub",
                "Updated USB-C hub",
                new BigDecimal("39.90"),
                7,
                3,
                true,
                categoryId
        );

        mockMvc.perform(put("/api/v1/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("USB-C Hub"))
                .andExpect(jsonPath("$.data.stockQuantity").value(7));

        mockMvc.perform(delete("/api/v1/products/{id}", productId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void exportsProductsAsCsv() throws Exception {
        long categoryId = createCategory("CSV Category", "csv-category");
        createProduct(new ProductRequest(
                "SKU-CSV-001",
                "CSV Product",
                "Exportable product",
                new BigDecimal("15.50"),
                11,
                3,
                true,
                categoryId
        ));

        mockMvc.perform(get("/api/v1/products/export.csv"))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    String content = result.getResponse().getContentAsString();
                    org.assertj.core.api.Assertions.assertThat(content).contains("id,sku,name,category,price,stockQuantity,lowStockThreshold,active");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"SKU-CSV-001\"");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"CSV Product\"");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"CSV Category\"");
                });
    }

    private long createCategory(String name, String slug) throws Exception {
        CategoryRequest categoryRequest = new CategoryRequest(name, slug, "Demo category", true);
        String categoryResponse = mockMvc.perform(post("/api/v1/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(categoryRequest)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode categoryJson = objectMapper.readTree(categoryResponse);
        return categoryJson.path("data").path("id").asLong();
    }

    private long createProduct(ProductRequest productRequest) throws Exception {
        String productResponse = mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequest)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode productJson = objectMapper.readTree(productResponse);
        return productJson.path("data").path("id").asLong();
    }
}
