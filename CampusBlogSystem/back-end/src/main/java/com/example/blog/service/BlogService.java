package com.example.blog.service;

import com.example.blog.domain.pojo.Blog;

import java.util.List;

public interface BlogService {
    List<Blog> alreadyPublish(int userId);

    List<Blog> waitVerify(int userId);

    List<Blog> list();

    List<Blog> searchText(String searchText);
}
