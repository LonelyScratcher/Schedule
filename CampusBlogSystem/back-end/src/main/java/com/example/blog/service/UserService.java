package com.example.blog.service;

import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;

public interface UserService {
    User login(String username, String password);

    AuthorInfo getAuthorInfo(int userId);
}
