package com.example.blog.service;

import com.example.blog.domain.pojo.User;

public interface UserService {
    User login(String username, String password);
}
