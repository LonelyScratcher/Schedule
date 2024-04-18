package com.example.blog.service.impl;
import java.util.Date;

import com.example.blog.dao.BlogRepository;
import com.example.blog.dao.CommentRepository;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.Comment;
import com.example.blog.domain.vo.CommentVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.CommentService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BlogRepository blogRepository;

    @Override
    public void insertComment(Comment comment) {
        commentRepository.save(comment);
    }


    @Override
    public List<CommentVo> accessList(int userId) {
        List<Comment> commentList = commentRepository.findByUserIdAndState(userId, Constant.APPROVED_ADOPT);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    @Override
    public List<CommentVo> list(int userId) {
        List<Comment> commentList = commentRepository.findByUserId(userId);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    private CommentVo plusInfo(Comment comment){
        Integer id = comment.getId();
        int blogId = comment.getBlogId();
        int userId = comment.getUserId();
        int state = comment.getState();
        String content = comment.getContent();
        Date date = comment.getDate();
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) throw new BusinessException(Code.BUSINESS_ERR,"查询评论数据失败！");
        String blogTitle = blog.getTitle();
        return new CommentVo(id, blogId, userId, state, content, blogTitle, date);
    }

    @Override
    public List<Comment> commentList(int blogId) {
        List<Comment> commentList = commentRepository.findByBlogId(blogId);
        return commentList;
    }

}
