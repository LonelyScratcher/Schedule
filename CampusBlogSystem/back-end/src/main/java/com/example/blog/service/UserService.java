package com.example.blog.service;

import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.domain.vo.StudentVo;
import com.example.blog.domain.vo.UserInfo;
import com.example.blog.domain.vo.UserLogin;

import java.util.List;

public interface UserService {
    UserLogin login(String username, String password);

    AuthorInfo getAuthorInfo(int userId);

    UserInfo getUserInfo(int userId);

    void updateUserInfo(UserInfo userInfo);

    UserInfo getAdminInfo(int userId);

    void updateAdminInfo(UserInfo adminInfo);

    List<StudentVo> recommendAuthor();
}
