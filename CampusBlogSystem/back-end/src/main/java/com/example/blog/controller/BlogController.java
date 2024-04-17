package com.example.blog.controller;


import com.example.blog.dao.BlogRepository;
import com.example.blog.domain.pojo.Blog;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.BlogService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import com.example.blog.util.Result;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    BlogService blogService;

    @PostMapping
    public Result publish(@RequestBody Blog blog, HttpServletRequest request){
        String userId = request.getHeader("userId");
        blog.setUserId(Integer.valueOf(userId));
        blog.setState(Constant.PEND_REVIEW);
        blogRepository.save(blog);
        return new Result(Code.REQUEST_OK,true);
    }

    @GetMapping
    public Result alreadyPublish(HttpServletRequest request){
        String userId = request.getHeader("userId");
        List<Blog> blogList = blogService.alreadyPublish(Integer.parseInt(userId));
        return new Result(Code.REQUEST_OK,blogList);
    }

    @GetMapping("/list")
    public Result list(){
        List<Blog> blogList = blogService.list();
        return new Result(Code.REQUEST_OK,blogList);
    }

    @GetMapping("/searchList")
    public Result searchList(@RequestParam("searchText") String searchText){
        List<Blog> blogList = blogService.searchText(searchText);
        return new Result(Code.REQUEST_OK,blogList);
    }


    @GetMapping("/waitVerify")
    public Result waitVerify(HttpServletRequest request){
        String userId = request.getHeader("userId");
        List<Blog> blogList = blogService.waitVerify(Integer.parseInt(userId));
        return new Result(Code.REQUEST_OK,blogList);
    }

    @GetMapping("/cover/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get("upload/cover/"+imageName);
        Resource image = new FileSystemResource(imagePath);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // 设置响应类型为图片类型
                .body(image);
    }

    @PostMapping("/uploadCover")
    public Result handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                // 获取文件的字节数组
                byte[] bytes = file.getBytes();
                // 指定文件保存的路径（可以根据需求修改）

                File classpath = ResourceUtils.getFile("");
                // 获取类路径的绝对路径
                String filePath = classpath.getAbsolutePath()+"\\upload\\cover\\";
                String timestamp = String.valueOf(new Date().getTime());
                String fileName = timestamp+"_"+file.getOriginalFilename();
                // 创建文件对象
                File uploadedFile = new File(filePath + fileName);
                // 将文件写入磁盘
                FileOutputStream fos = new FileOutputStream(uploadedFile);
                fos.write(bytes);
                fos.close();
                return new Result(Code.REQUEST_OK,fileName);
            } catch (IOException e) {
                System.out.println(e.getMessage());
                throw new BusinessException(Code.BUSINESS_ERR,"文件上传失败！");
            }
        } else {
            throw new BusinessException(Code.BUSINESS_ERR,"文件为空！");
        }
    }
}
