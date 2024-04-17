package com.example.blog.service.impl;

import com.example.blog.dao.BlogRepository;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.blog.util.Constant.APPROVED_ADOPT;


@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    BlogRepository blogRepository;

    @Override
    public List<Blog> alreadyPublish(int userId) {
        return blogRepository.findBlogsByUserIdAndState(userId,APPROVED_ADOPT);
    }

    @Override
    public List<Blog> waitVerify(int userId) {
        return blogRepository.findBlogsByUserId(userId);
    }

    @Override
    public List<Blog> list() {
        return blogRepository.findBlogsByState(APPROVED_ADOPT);
    }

    @Override
    public List<Blog> searchText(String searchText) {
        return blogRepository.findBlogsByStateAndTitleContaining(APPROVED_ADOPT,searchText);
    }
}
