package com.ruhatkaratas.employeemanagement.dto.common;

import java.time.LocalDateTime;
import java.util.List;

public record PagedResponse<T>(
        boolean success,
        String message,
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last,
        LocalDateTime timestamp
) {

    public static <T> PagedResponse<T> success(
            String message,
            List<T> content,
            int page,
            int size,
            long totalElements,
            int totalPages,
            boolean first,
            boolean last
    ) {
        return new PagedResponse<>(
                true,
                message,
                content,
                page,
                size,
                totalElements,
                totalPages,
                first,
                last,
                LocalDateTime.now()
        );
    }
}

