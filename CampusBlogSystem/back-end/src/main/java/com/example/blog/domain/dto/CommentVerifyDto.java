package com.example.blog.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentVerifyDto {
    private int commentId;
    private boolean result;
    private String reason;
}
