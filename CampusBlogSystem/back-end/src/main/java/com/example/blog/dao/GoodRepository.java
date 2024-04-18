package com.example.blog.dao;

import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.Good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface GoodRepository extends JpaRepository<Good, Integer> {
    public int countByBlogId(int blogId);

    public boolean existsByBlogIdAndUserId(int blogId,int userId);
    @Transactional
    public void removeByBlogIdAndUserId(int blogId,int userId);

}
