package com.example.blog.domain.vo;

import com.example.blog.domain.pojo.Blog;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class VerifyBlogVo{
    private Integer id;

    private Integer userId;
    private Date date;
    private String title;
    private String content;
    private String tagName;
    private String coverUrl;
    private int state;

    private String username;
    private String author;
}
