package com.example.blog.domain.vo;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentVo {
    private Integer id;

    private String name;
    private String avatarUrl;
    private String description;
    private int goodNum;
}
