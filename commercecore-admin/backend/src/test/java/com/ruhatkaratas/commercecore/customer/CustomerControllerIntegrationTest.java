package com.ruhatkaratas.commercecore.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
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
class CustomerControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createsCustomerWithResponseDto() throws Exception {
        CustomerRequest request = new CustomerRequest(
                "Ada",
                "Lovelace",
                "ada.customer@example.com",
                "+90 555 010 2026"
        );

        mockMvc.perform(post("/api/v1/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").isNumber())
                .andExpect(jsonPath("$.data.email").value("ada.customer@example.com"));
    }

    @Test
    void updatesAndDeletesCustomerWithResponseDto() throws Exception {
        long customerId = createCustomer(new CustomerRequest(
                "Grace",
                "Hopper",
                "grace.customer@example.com",
                "+90 555 010 3030"
        ));

        CustomerRequest updateRequest = new CustomerRequest(
                "Grace",
                "Murray",
                "grace.murray@example.com",
                "+90 555 010 3031"
        );

        mockMvc.perform(put("/api/v1/customers/{id}", customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.lastName").value("Murray"))
                .andExpect(jsonPath("$.data.email").value("grace.murray@example.com"));

        mockMvc.perform(delete("/api/v1/customers/{id}", customerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void exportsCustomersAsCsv() throws Exception {
        createCustomer(new CustomerRequest(
                "CSV",
                "Customer",
                "csv.customer@example.com",
                "+90 555 010 4040"
        ));

        mockMvc.perform(get("/api/v1/customers/export.csv"))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    String content = result.getResponse().getContentAsString();
                    org.assertj.core.api.Assertions.assertThat(content).contains("id,firstName,lastName,email,phone");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"CSV\"");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"Customer\"");
                    org.assertj.core.api.Assertions.assertThat(content).contains("\"csv.customer@example.com\"");
                });
    }

    private long createCustomer(CustomerRequest request) throws Exception {
        String response = mockMvc.perform(post("/api/v1/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(response);
        return json.path("data").path("id").asLong();
    }
}
