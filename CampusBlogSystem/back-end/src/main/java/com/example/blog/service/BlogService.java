package com.example.blog.service;

import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.vo.BlogVo;
import com.example.blog.domain.vo.PageVo;

import java.util.List;

public interface BlogService {
    List<BlogVo> publishList(int userId);

    List<Blog> waitVerify(int userId);

    PageVo<BlogVo> list(int curUserId, int pageNum,String tagName);

    List<Blog> searchText(String searchText);

    boolean switchGood(int userId,int blogId);

    void increaseAccess(int blogId);

    BlogVo item(int blogId,int curUserId);

    void remove(int blogId);

    List<BlogVo> browseList();

    List<Blog> pageList(int pageNum);
}
