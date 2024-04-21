package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLogin {
    private Integer id;

    private String username;
    private String password;
    private int identity;
    String avatar;
}
