package com.example.blog.service.impl;
import java.util.Date;

import com.example.blog.dao.AuditRepository;
import com.example.blog.dao.BlogRepository;
import com.example.blog.dao.StudentRepository;
import com.example.blog.dao.UserRepository;
import com.example.blog.domain.dto.VerifyDto;
import com.example.blog.domain.pojo.Audit;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.Student;
import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.VerifyBlogVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.AdminBlogService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import com.example.blog.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminBlogServiceImpl implements AdminBlogService {
    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AuditRepository auditRepository;

    @Override
    public List<VerifyBlogVo> verifyBlogList() {
        //只要不是PEND_REVIEW都OK
        List<Blog> blogList = blogRepository.findAll();
        List<VerifyBlogVo> verifyBlogVoList = new ArrayList<>();
        for (Blog blog:blogList){
            Integer id = blog.getId();
            Integer userId = blog.getUserId();
            Date date = blog.getDate();
            String title = blog.getTitle();
            String content = blog.getContent();
            String tagName = blog.getTagName();
            String coverUrl = blog.getCoverUrl();
            int state = blog.getState();
            String username = "";
            String author = "";

            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) username = userOptional.get().getUsername();

            Optional<Student> studentOptional = studentRepository.findById(userId);
            if (studentOptional.isPresent()) author = studentOptional.get().getName();

            VerifyBlogVo verifyBlogVo = new VerifyBlogVo(id, userId, date, title, content, tagName, coverUrl, state, username, author);
            verifyBlogVoList.add(verifyBlogVo);
        }
        return verifyBlogVoList;
    }

    @Override
    public void verify(VerifyDto verifyDto) {
        int blogId = verifyDto.getBlogId();
        boolean isResult = verifyDto.isResult();
        String reason = verifyDto.getReason();
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) throw new BusinessException(Code.BUSINESS_ERR,"审核博客失败！");
        if (isResult) blog.setState(Constant.APPROVED_ADOPT);
        else {
            blog.setState(Constant.APPROVED_REFUSE);
            Audit audit = new Audit();
            audit.setBlogId(blogId);
            audit.setReason(reason);
            auditRepository.save(audit);
        }
        blogRepository.save(blog);
    }

    @Override
    public Audit checkVerify(int blogId) {
        Audit audit = auditRepository.findByBlogId(blogId);
        if (audit == null) throw new BusinessException(Code.BUSINESS_ERR,"查找审核博客结果失败！");
        return audit;
    }
}
