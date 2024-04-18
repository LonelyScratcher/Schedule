package com.example.blog.service.impl;
import java.util.Date;

import com.example.blog.dao.*;
import com.example.blog.domain.pojo.*;
import com.example.blog.domain.vo.BlogVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.BlogService;
import com.example.blog.util.Code;
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

    @Override
    public List<Blog> alreadyPublish(int userId) {
        return blogRepository.findBlogsByUserIdAndState(userId,APPROVED_ADOPT);
    }

    @Override
    public List<Blog> waitVerify(int userId) {
        return blogRepository.findBlogsByUserId(userId);
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
            List<Comment> commentList = commentRepository.findByBlogId(id);
            BlogVo blogVo = new BlogVo(id, userId, date, title, content, tagName, coverUrl, state, username, author, goodNum, commentList,isGood);
            blogVoList.add(blogVo);
        }
        return blogVoList;
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
}
