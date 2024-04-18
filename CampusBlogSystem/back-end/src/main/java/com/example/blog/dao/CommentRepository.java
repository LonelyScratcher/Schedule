package com.example.blog.dao;

import com.example.blog.domain.pojo.Comment;
import com.example.blog.domain.pojo.Good;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    public List<Comment> findByBlogId(int blogId);
    public List<Comment> findByUserIdAndStateNot(int userId,int state);

    public List<Comment> findByUserIdAndState(int userId,int state);
    public int countByBlogId(int blogId);
}
