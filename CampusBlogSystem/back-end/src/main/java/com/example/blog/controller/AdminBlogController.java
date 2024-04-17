package com.example.blog.controller;

import com.example.blog.dao.BlogRepository;
import com.example.blog.domain.dto.VerifyDto;
import com.example.blog.domain.pojo.Audit;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.vo.VerifyBlogVo;
import com.example.blog.service.AdminBlogService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import com.example.blog.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminBlog")
public class AdminBlogController {

    @Autowired
    AdminBlogService adminBlogService;

    @GetMapping("/verifyList")
    public Result list(){
        List<VerifyBlogVo> list = adminBlogService.verifyBlogList();
        return new Result(Code.REQUEST_OK,list);
    }

    @PostMapping("/verify")
    public Result verify(@RequestBody VerifyDto verifyDto){
        adminBlogService.verify(verifyDto);
        return new Result(Code.REQUEST_OK,true);
    }

    @GetMapping("/verifyCheck")
    public Result verifyCheck(@RequestParam("blogId") int blogId){
        Audit audit = adminBlogService.checkVerify(blogId);
        return new Result(Code.REQUEST_OK,audit);
    }
}
