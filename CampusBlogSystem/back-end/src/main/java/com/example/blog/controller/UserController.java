package com.example.blog.controller;



import com.example.blog.domain.pojo.User;
import com.example.blog.domain.vo.AuthorInfo;
import com.example.blog.domain.vo.UserInfo;
import com.example.blog.domain.vo.UserLogin;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.UserService;
import com.example.blog.util.Code;
import com.example.blog.util.Result;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public Result login(@RequestParam("username") String username,
                        @RequestParam("password") String password){
        UserLogin userLogin = userService.login(username,password);
        return new Result(Code.REQUEST_OK,userLogin);
    }

    @GetMapping("/authorInfo")
    public Result authorInfo(@RequestParam("userId") int userId){
        AuthorInfo authorInfo = userService.getAuthorInfo(userId);
        return new Result(Code.REQUEST_OK,authorInfo);
    }

    //获取用户完整信息
    @GetMapping("/userInfo")
    public Result userInfo(HttpServletRequest request){
        String userIdStr = request.getHeader("userId");
        UserInfo userInfo = userService.getUserInfo(Integer.parseInt(userIdStr));
        return new Result(Code.REQUEST_OK,userInfo);
    }

    @GetMapping("/adminInfo")
    public Result adminInfo(HttpServletRequest request){
        String userIdStr = request.getHeader("userId");
        UserInfo adminInfo = userService.getAdminInfo(Integer.parseInt(userIdStr));
        return new Result(Code.REQUEST_OK,adminInfo);
    }

    @PutMapping ("/userInfo")
    public Result updateUserInfo(@RequestBody UserInfo userInfo){
        userService.updateUserInfo(userInfo);
        return new Result(Code.REQUEST_OK,true);
    }

    @PutMapping ("/adminInfo")
    public Result updateAdminInfo(@RequestBody UserInfo adminInfo){
        userService.updateAdminInfo(adminInfo);
        return new Result(Code.REQUEST_OK,true);
    }

}
