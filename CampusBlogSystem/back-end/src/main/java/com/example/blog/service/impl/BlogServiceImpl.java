package com.example.blog.service.impl;
import java.util.Date;

import com.example.blog.dao.*;
import com.example.blog.domain.pojo.*;
import com.example.blog.domain.vo.BlogVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.BlogService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.example.blog.util.Constant.APPROVED_ADOPT;


@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    GoodRepository goodRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    AuditRepository auditRepository;

    @Override
    public List<Blog> alreadyPublish(int userId) {
        return blogRepository.findBlogsByUserIdAndState(userId,APPROVED_ADOPT);
    }

    @Override
    public List<Blog> waitVerify(int userId) {
        return blogRepository.findBlogsByUserIdAndStateNot(userId, APPROVED_ADOPT);
    }


    @Override
    public List<BlogVo> list(int curUserId) {
        List<Blog> blogList = blogRepository.findBlogsByState(APPROVED_ADOPT);
        List<BlogVo> blogVoList = new ArrayList<>();
        for (Blog blog:blogList){
            Integer id = blog.getId();
            Integer userId = blog.getUserId();
            Date date = blog.getDate();
            String title = blog.getTitle();
            String content = blog.getContent();
            String tagName = blog.getTagName();
            String coverUrl = blog.getCoverUrl();
            int state = blog.getState();

            User user = userRepository.findById(userId).orElse(null);
            Student student = studentRepository.findById(userId).orElse(null);
            if (user==null || student== null) throw new BusinessException(Code.BUSINESS_ERR,"查询博客数据错误！");
            String username = user.getUsername();
            String author = student.getName();

            int goodNum = goodRepository.countByBlogId(id);
            boolean isGood = goodRepository.existsByBlogIdAndUserId(id,curUserId);
            int commentNum = commentRepository.countByBlogIdAndState(id, APPROVED_ADOPT);
            BlogVo blogVo = new BlogVo(id, userId, date, title, content, tagName, coverUrl, state, username, author, goodNum, commentNum,isGood);
            blogVoList.add(blogVo);
        }
        return blogVoList;
    }

    @Override
    public BlogVo item(int blogId,int curUserId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog==null) throw new BusinessException(Code.BUSINESS_ERR,"查询博客信息错误！");
        Integer id = blog.getId();
        Integer userId = blog.getUserId();
        Date date = blog.getDate();
        String title = blog.getTitle();
        String content = blog.getContent();
        String tagName = blog.getTagName();
        String coverUrl = blog.getCoverUrl();
        int state = blog.getState();

        User user = userRepository.findById(userId).orElse(null);
        Student student = studentRepository.findById(userId).orElse(null);
        if (user==null || student== null) throw new BusinessException(Code.BUSINESS_ERR,"查询博客数据错误！");
        String username = user.getUsername();
        String author = student.getName();

        int goodNum = goodRepository.countByBlogId(blogId);
        boolean isGood = goodRepository.existsByBlogIdAndUserId(id,curUserId);
        int commentNum = commentRepository.countByBlogIdAndState(id, APPROVED_ADOPT);
        return new BlogVo(id, userId, date, title, content, tagName, coverUrl, state, username, author, goodNum, commentNum,isGood);

    }

    @Override
    public void remove(int blogId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog==null) throw new BusinessException(Code.BUSINESS_ERR,"删除博客失败！");
        if (blog.getState()==Constant.APPROVED_REFUSE){
            Audit audit = auditRepository.findByBlogId(blogId);
            auditRepository.deleteById(audit.getId());
        }
        blogRepository.deleteById(blogId);
    }

    @Override
    public List<Blog> searchText(String searchText) {
        return blogRepository.findBlogsByStateAndTitleContaining(APPROVED_ADOPT,searchText);
    }

    @Override
    public boolean switchGood(int userId, int blogId) {
        boolean isGood = goodRepository.existsByBlogIdAndUserId(blogId,userId);
        if (isGood) goodRepository.removeByBlogIdAndUserId(blogId,userId);
        else {
            Good good = new Good();
            good.setBlogId(blogId);
            good.setUserId(userId);
            goodRepository.save(good);
        }
        return !isGood;
    }

    @Override
    public void increaseAccess(int blogId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog==null) throw new BusinessException(Code.BUSINESS_ERR,"未查询到博客数据");
        int access = blog.getAccess();
        blog.setAccess(access+1);
        blogRepository.save(blog);
    }

}
