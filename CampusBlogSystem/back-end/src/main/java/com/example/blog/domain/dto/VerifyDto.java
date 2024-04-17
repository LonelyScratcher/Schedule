package com.example.blog.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyDto {
    int blogId;
    private boolean result;
    private String reason;
}
