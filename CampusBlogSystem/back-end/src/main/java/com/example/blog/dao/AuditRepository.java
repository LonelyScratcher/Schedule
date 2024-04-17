package com.example.blog.dao;

import com.example.blog.domain.pojo.Audit;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditRepository extends JpaRepository<Audit, Integer> {
    Audit findByBlogId(int blogId);
}
