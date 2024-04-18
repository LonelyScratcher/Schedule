package com.example.blog.controller;



import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.UserService;
import com.example.blog.util.Code;
import com.example.blog.util.Result;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public Result login(@RequestParam("username") String username,
                        @RequestParam("password") String password){
        User user = userService.login(username,password);
        if (user == null) throw new BusinessException(Code.BUSINESS_ERR,"用户名或者密码错误！");
        else return new Result(Code.REQUEST_OK,user);
    }

    @GetMapping("/authorInfo")
    public Result authorInfo(HttpServletRequest request){
        String userIdStr = request.getHeader("userId");
        int userId = 0;
        if (userIdStr != null) userId = Integer.parseInt(userIdStr);
        AuthorInfo authorInfo = userService.getAuthorInfo(userId);
        return new Result(Code.REQUEST_OK,authorInfo);
    }
}
