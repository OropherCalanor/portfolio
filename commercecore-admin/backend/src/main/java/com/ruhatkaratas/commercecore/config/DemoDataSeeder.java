package com.ruhatkaratas.commercecore.config;

import com.ruhatkaratas.commercecore.category.Category;
import com.ruhatkaratas.commercecore.category.CategoryRepository;
import com.ruhatkaratas.commercecore.customer.Customer;
import com.ruhatkaratas.commercecore.customer.CustomerRepository;
import com.ruhatkaratas.commercecore.order.CustomerOrder;
import com.ruhatkaratas.commercecore.order.OrderItem;
import com.ruhatkaratas.commercecore.order.OrderRepository;
import com.ruhatkaratas.commercecore.order.OrderStatus;
import com.ruhatkaratas.commercecore.product.Product;
import com.ruhatkaratas.commercecore.product.ProductRepository;
import com.ruhatkaratas.commercecore.stock.StockMovement;
import com.ruhatkaratas.commercecore.stock.StockMovementRepository;
import com.ruhatkaratas.commercecore.stock.StockMovementType;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DemoDataSeeder {

    @Bean
    CommandLineRunner seedDemoData(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            OrderRepository orderRepository,
            StockMovementRepository stockMovementRepository
    ) {
        return args -> {
            if (productRepository.count() > 0) {
                return;
            }

            Category electronics = category("Electronics", "electronics", "Devices and workspace gear");
            Category audio = category("Audio", "audio", "Headphones, speakers, and recording accessories");
            Category office = category("Office", "office", "Furniture and productivity equipment");
            categoryRepository.saveAll(List.of(electronics, audio, office));

            Product keyboard = product("CC-KB-001", "Mechanical Keyboard", "Compact keyboard for office setups", "49.90", 18, 5, electronics);
            Product headphones = product("CC-HD-014", "Studio Headphones", "Closed-back headphones for focused work", "89.50", 4, 8, audio);
            Product chair = product("CC-CH-220", "Ergonomic Chair", "Adjustable office chair for long work sessions", "249.90", 9, 4, office);
            Product monitor = product("CC-MN-088", "4K Monitor", "27-inch display for productivity and design review", "420.00", 2, 5, electronics);
            productRepository.saveAll(List.of(keyboard, headphones, chair, monitor));

            Customer aylin = customer("Aylin", "Demir", "aylin@example.com", "+90 555 010 1001");
            Customer mert = customer("Mert", "Kaya", "mert@example.com", "+90 555 010 1002");
            Customer selin = customer("Selin", "Aras", "selin@example.com", "+90 555 010 1003");
            customerRepository.saveAll(List.of(aylin, mert, selin));

            orderRepository.save(order("ORD-8421", aylin, OrderStatus.PAID, List.of(orderItem(chair, 1), orderItem(keyboard, 2))));
            orderRepository.save(order("ORD-8420", mert, OrderStatus.FULFILLED, List.of(orderItem(headphones, 1))));
            orderRepository.save(order("ORD-8419", selin, OrderStatus.DRAFT, List.of(orderItem(monitor, 2), orderItem(keyboard, 1))));

            stockMovementRepository.saveAll(List.of(
                    stockMovement(monitor, StockMovementType.OUT, 3, "Order fulfillment"),
                    stockMovement(headphones, StockMovementType.IN, 12, "Supplier restock"),
                    stockMovement(keyboard, StockMovementType.ADJUSTMENT, -1, "Inventory audit")
            ));
        };
    }

    private Category category(String name, String slug, String description) {
        Category category = new Category();
        category.setName(name);
        category.setSlug(slug);
        category.setDescription(description);
        category.setActive(true);
        return category;
    }

    private Product product(
            String sku,
            String name,
            String description,
            String price,
            int stockQuantity,
            int lowStockThreshold,
            Category category
    ) {
        Product product = new Product();
        product.setSku(sku);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(new BigDecimal(price));
        product.setStockQuantity(stockQuantity);
        product.setLowStockThreshold(lowStockThreshold);
        product.setActive(true);
        product.setCategory(category);
        return product;
    }

    private Customer customer(String firstName, String lastName, String email, String phone) {
        Customer customer = new Customer();
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setEmail(email);
        customer.setPhone(phone);
        return customer;
    }

    private CustomerOrder order(String orderNumber, Customer customer, OrderStatus status, List<OrderItem> items) {
        CustomerOrder order = new CustomerOrder();
        order.setOrderNumber(orderNumber);
        order.setCustomer(customer);
        order.setStatus(status);
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : items) {
            item.setOrder(order);
            order.getItems().add(item);
            total = total.add(item.getLineTotal());
        }
        order.setTotalAmount(total);
        return order;
    }

    private OrderItem orderItem(Product product, int quantity) {
        OrderItem item = new OrderItem();
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice());
        item.setLineTotal(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        return item;
    }

    private StockMovement stockMovement(Product product, StockMovementType type, int quantity, String note) {
        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setType(type);
        movement.setQuantity(quantity);
        movement.setNote(note);
        return movement;
    }
}
