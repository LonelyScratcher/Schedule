package com.example.blog.service.impl;

import com.example.blog.dao.*;
import com.example.blog.domain.pojo.Admin;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.domain.pojo.Student;
import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.domain.vo.InfoItem;
import com.example.blog.domain.vo.UserInfo;
import com.example.blog.domain.vo.UserLogin;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.UserService;
import com.example.blog.util.Code;
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
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserLogin login(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username,password);

        if (user==null) throw new BusinessException(Code.BUSINESS_ERR,"用户名或者密码错误！");
        Integer id = user.getId();
        int identity = user.getIdentity();
        String avatar = "";
        if (identity==Constant.STUDENT_IDENTITY){
            Student student = studentRepository.findById(id).orElse(null);
            avatar = student.getAvatarUrl();
        }else{
            Admin admin = adminRepository.findById(id).orElse(null);
            avatar = admin.getAvatarUrl();
        }
        return new UserLogin(id, username, password, identity, avatar);
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

    @Override
    public UserInfo getUserInfo(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        Student student = studentRepository.findById(userId).orElse(null);
        if (user==null||student==null) throw new BusinessException(Code.BUSINESS_ERR,"查询用户信息错误！");

        Integer id = user.getId();
        String username = user.getUsername();
        String password = user.getPassword();
        int identity = user.getIdentity();

        String name = student.getName();
        String avatarUrl = student.getAvatarUrl();
        String description = student.getDescription();

        return new UserInfo(id, username, password, identity, name, avatarUrl, description);
    }

    @Override
    public void updateUserInfo(UserInfo userInfo) {

        int id = userInfo.getId();
        User user = userRepository.findById(id).orElse(null);
        Student student = studentRepository.findById(id).orElse(null);

        if (user==null||student==null) throw new BusinessException(Code.BUSINESS_ERR,"更新用户信息失败！");
        String username = userInfo.getUsername();
        String password = userInfo.getPassword();
        int identity = userInfo.getIdentity();
        String name = userInfo.getName();
        String avatarUrl = userInfo.getAvatarUrl();
        String description = userInfo.getDescription();

        user.setUsername(username);
        user.setPassword(password);
        user.setIdentity(identity);

        student.setName(name);
        student.setAvatarUrl(avatarUrl);
        student.setDescription(description);
        userRepository.save(user);
        studentRepository.save(student);
    }

    @Override
    public UserInfo getAdminInfo(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        Admin admin = adminRepository.findById(userId).orElse(null);
        if (user==null||admin==null) throw new BusinessException(Code.BUSINESS_ERR,"查询管理员信息错误！");

        Integer id = user.getId();
        String username = user.getUsername();
        String password = user.getPassword();
        int identity = user.getIdentity();

        String name = admin.getName();
        String avatarUrl = admin.getAvatarUrl();

        return new UserInfo(id, username, password, identity, name, avatarUrl, "");
    }

    @Override
    public void updateAdminInfo(UserInfo adminInfo) {
        int id = adminInfo.getId();
        User user = userRepository.findById(id).orElse(null);
        Admin admin = adminRepository.findById(id).orElse(null);

        if (user==null||admin==null) throw new BusinessException(Code.BUSINESS_ERR,"查询管理员信息失败！");

        String username = adminInfo.getUsername();
        String password = adminInfo.getPassword();
        int identity = adminInfo.getIdentity();
        String name = adminInfo.getName();
        String avatarUrl = adminInfo.getAvatarUrl();

        user.setUsername(username);
        user.setPassword(password);
        user.setIdentity(identity);

        admin.setName(name);
        admin.setAvatarUrl(avatarUrl);
        userRepository.save(user);
        adminRepository.save(admin);
    }
}
