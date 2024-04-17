package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class UploadCoverVo {
    String imageUrl;
    String message;
}
