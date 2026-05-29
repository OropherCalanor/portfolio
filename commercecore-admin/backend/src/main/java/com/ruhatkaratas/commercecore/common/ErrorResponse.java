package com.ruhatkaratas.commercecore.common;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        boolean success,
        String message,
        Map<String, String> errors,
        LocalDateTime timestamp
) {
}
