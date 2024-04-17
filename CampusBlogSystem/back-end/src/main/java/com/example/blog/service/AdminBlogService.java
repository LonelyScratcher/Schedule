package com.example.blog.service;

import com.example.blog.domain.dto.VerifyDto;
import com.example.blog.domain.pojo.Audit;
import com.example.blog.domain.vo.VerifyBlogVo;

import java.util.List;

public interface AdminBlogService {
    List<VerifyBlogVo> verifyBlogList();
    void verify(VerifyDto verifyDto);
    Audit checkVerify(int blogId);
}
