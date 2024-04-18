package com.example.blog.service;

import com.example.blog.domain.pojo.Comment;
import com.example.blog.domain.vo.CommentVo;

import java.util.List;

public interface CommentService {

    public void insertComment(Comment comment);

    List<CommentVo> list(int useId);

    List<CommentVo> accessList(int userId);

    List<Comment> commentList(int blogId);
}
