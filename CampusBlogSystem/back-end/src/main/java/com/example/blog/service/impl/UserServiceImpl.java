package com.example.blog.service.impl;

import com.example.blog.dao.BlogRepository;
import com.example.blog.dao.CommentRepository;
import com.example.blog.dao.GoodRepository;
import com.example.blog.dao.UserRepository;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.domain.vo.InfoItem;
import com.example.blog.service.UserService;
import com.example.blog.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private GoodRepository goodRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username,password);
    }

    @Override
    public AuthorInfo getAuthorInfo(int userId) {
        InfoItem[] generalAttr = new InfoItem[2];
        InfoItem[] detailAttr = new InfoItem[2];
        InfoItem infoItem1 = new InfoItem("博客数",0);
        InfoItem infoItem2 = new InfoItem("总访问",0);
        List<Blog> blogList = blogRepository.findBlogsByUserIdAndState(userId, Constant.APPROVED_ADOPT);
        infoItem1.setValue(blogList.size());
        int sum =0;
        for(Blog blog:blogList) sum+=blog.getAccess();
        infoItem2.setValue(sum);
        generalAttr[0] = infoItem1;
        generalAttr[1] = infoItem2;
        InfoItem infoItem3 = new InfoItem("获赞",0);
        InfoItem infoItem4 = new InfoItem("评论",0);
        sum=0;
        for(Blog blog:blogList) sum+=goodRepository.countByBlogId(blog.getId());
        infoItem3.setValue(sum);
        sum=0;
        for(Blog blog:blogList) sum+=commentRepository.countByBlogId(blog.getId());
        infoItem4.setValue(sum);
        detailAttr[0] = infoItem3;
        detailAttr[1] = infoItem4;
        return new AuthorInfo(generalAttr,detailAttr);
    }
}
