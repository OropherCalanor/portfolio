package com.ruhatkaratas.commercecore.product;

import com.ruhatkaratas.commercecore.category.Category;
import com.ruhatkaratas.commercecore.category.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductResponse> list() {
        return productRepository.findAll().stream().map(this::toResponse).toList();
    }

    public String exportCsv() {
        String header = "id,sku,name,category,price,stockQuantity,lowStockThreshold,active";
        String rows = productRepository.findAll().stream()
                .map(product -> String.join(",",
                        product.getId().toString(),
                        csv(product.getSku()),
                        csv(product.getName()),
                        csv(product.getCategory() == null ? "Uncategorized" : product.getCategory().getName()),
                        product.getPrice().toPlainString(),
                        Integer.toString(product.getStockQuantity()),
                        Integer.toString(product.getLowStockThreshold()),
                        Boolean.toString(product.isActive())
                ))
                .collect(Collectors.joining("\n"));

        return rows.isBlank() ? header + "\n" : header + "\n" + rows + "\n";
    }

    public ProductResponse create(ProductRequest request) {
        return toResponse(save(new Product(), request));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return toResponse(save(product, request));
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private Product save(Product product, ProductRequest request) {
        Category category = request.categoryId() == null
                ? null
                : categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        product.setSku(request.sku().trim());
        product.setName(request.name().trim());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStockQuantity(request.stockQuantity());
        product.setLowStockThreshold(request.lowStockThreshold());
        product.setActive(request.active());
        product.setCategory(category);
        return productRepository.save(product);
    }

    private ProductResponse toResponse(Product product) {
        Category category = product.getCategory();
        return new ProductResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getLowStockThreshold(),
                product.isActive(),
                category == null ? null : category.getId(),
                category == null ? null : category.getName()
        );
    }

    private String csv(String value) {
        String escaped = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + escaped + "\"";
    }
}
