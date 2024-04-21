package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfo {
    private Integer id;

    private String username;
    private String password;
    private int identity;

    private String name;
    private String avatarUrl;
    private String description;
}
