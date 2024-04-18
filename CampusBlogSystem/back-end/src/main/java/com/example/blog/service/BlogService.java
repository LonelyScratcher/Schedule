package com.example.blog.service;

import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.vo.BlogVo;

import java.util.List;

public interface BlogService {
    List<Blog> alreadyPublish(int userId);

    List<Blog> waitVerify(int userId);

    List<BlogVo> list(int curUserId);

    List<Blog> searchText(String searchText);

    boolean switchGood(int userId,int blogId);
}
