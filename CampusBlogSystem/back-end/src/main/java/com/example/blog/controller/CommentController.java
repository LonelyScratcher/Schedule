package com.example.blog.controller;


import com.example.blog.domain.pojo.Comment;
import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.CommentVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.CommentService;
import com.example.blog.util.Code;
import com.example.blog.util.Result;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping
    public Result insert(@RequestBody Comment comment){
        commentService.insertComment(comment);
        return new Result(Code.REQUEST_OK,true);
    }
    //全部评论
    @GetMapping
    public Result list(HttpServletRequest request){
        String userIdStr = request.getHeader("userId");
        int userId = Integer.parseInt(userIdStr);
        List<CommentVo> commentVoList = commentService.list(userId);
        return new Result(Code.REQUEST_OK,commentVoList);
    }
    //仅限于通过的评论
    @GetMapping("/accessList")
    public Result accessList(HttpServletRequest request){
        String userIdStr = request.getHeader("userId");
        int userId = Integer.parseInt(userIdStr);
        List<CommentVo> commentVoList = commentService.accessList(userId);
        return new Result(Code.REQUEST_OK,commentVoList);
    }

    //某博客对应全部评论
    @GetMapping("/commentList")
    public Result commentList(@RequestParam("blogId") int blogId){
        List<Comment> commentList = commentService.commentList(blogId);
        return new Result(Code.REQUEST_OK,commentList);
    }
}
