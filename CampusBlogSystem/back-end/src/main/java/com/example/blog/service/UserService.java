package com.example.blog.service;

import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.domain.vo.UserInfo;
import com.example.blog.domain.vo.UserLogin;

public interface UserService {
    UserLogin login(String username, String password);

    AuthorInfo getAuthorInfo(int userId);

    UserInfo getUserInfo(int userId);

    void updateUserInfo(UserInfo userInfo);

    UserInfo getAdminInfo(int userId);

    void updateAdminInfo(UserInfo adminInfo);
}
