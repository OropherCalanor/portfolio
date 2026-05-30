package com.ruhatkaratas.commercecore.customer;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerResponse> list() {
        return customerRepository.findAll().stream().map(this::toResponse).toList();
    }

    public String exportCsv() {
        String header = "id,firstName,lastName,email,phone";
        String rows = customerRepository.findAll().stream()
                .map(customer -> String.join(",",
                        customer.getId().toString(),
                        csv(customer.getFirstName()),
                        csv(customer.getLastName()),
                        csv(customer.getEmail()),
                        csv(customer.getPhone())
                ))
                .collect(Collectors.joining("\n"));

        return rows.isBlank() ? header + "\n" : header + "\n" + rows + "\n";
    }

    public CustomerResponse create(CustomerRequest request) {
        return toResponse(save(new Customer(), request));
    }

    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found"));
        return toResponse(save(customer, request));
    }

    public void delete(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new EntityNotFoundException("Customer not found");
        }
        customerRepository.deleteById(id);
    }

    private Customer save(Customer customer, CustomerRequest request) {
        customer.setFirstName(request.firstName().trim());
        customer.setLastName(request.lastName().trim());
        customer.setEmail(request.email().trim().toLowerCase());
        customer.setPhone(request.phone());
        return customerRepository.save(customer);
    }

    private CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhone()
        );
    }

    private String csv(String value) {
        String escaped = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + escaped + "\"";
    }
}
