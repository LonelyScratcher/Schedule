package com.example.blog.dao;


import com.example.blog.domain.pojo.Audit;
import com.example.blog.domain.pojo.CommentAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CommentAuditRepository extends JpaRepository<CommentAudit, Integer> {
    @Transactional
    public void removeByCommentId(int commentId);
}
