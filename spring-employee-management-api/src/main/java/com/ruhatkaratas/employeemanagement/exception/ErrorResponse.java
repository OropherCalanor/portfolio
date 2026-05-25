package com.ruhatkaratas.employeemanagement.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        boolean success,
        String message,
        Map<String, String> errors,
        LocalDateTime timestamp
) {

    public static ErrorResponse of(String message, Map<String, String> errors) {
        return new ErrorResponse(false, message, errors, LocalDateTime.now());
    }

    public static ErrorResponse of(String message) {
        return new ErrorResponse(false, message, Map.of(), LocalDateTime.now());
    }
}

