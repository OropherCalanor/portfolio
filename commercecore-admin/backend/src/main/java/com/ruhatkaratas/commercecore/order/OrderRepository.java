package com.ruhatkaratas.commercecore.order;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    @Override
    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    List<CustomerOrder> findAll();

    @Override
    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    Optional<CustomerOrder> findById(Long id);
}
