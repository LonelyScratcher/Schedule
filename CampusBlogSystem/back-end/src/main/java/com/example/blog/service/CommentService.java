package com.example.blog.service;

import com.example.blog.domain.dto.CommentVerifyDto;
import com.example.blog.domain.pojo.Comment;
import com.example.blog.domain.pojo.CommentAudit;
import com.example.blog.domain.vo.CommentVo;

import java.util.List;

public interface CommentService {

    public void insertComment(Comment comment);

    List<CommentVo> list(int useId);

    List<CommentVo> accessList(int userId);

    List<Comment> commentList(int blogId);

    void rewrite(Comment comment);

    void remove(int commentId);

    List<CommentVo> verifyList();

    List<CommentVo> browseList();

    void verify(CommentVerifyDto commentVerifyDto);

    CommentAudit check(int commentId);

    void update(Comment comment);

    List<CommentVo> blogOwn(int blogId);

    String reason(int commentId);
}

