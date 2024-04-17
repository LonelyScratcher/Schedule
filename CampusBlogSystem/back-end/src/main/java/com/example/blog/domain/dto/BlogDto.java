package com.example.blog.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class BlogDto {
    private Integer id;

    private Integer userId;
    private Date date;
    private String title;
    private String content;
    private String tagName;
    private String coverUrl;
    private int state;
    private boolean isRewrite;
}
