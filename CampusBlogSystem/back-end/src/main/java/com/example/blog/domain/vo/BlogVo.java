package com.example.blog.domain.vo;

import com.example.blog.domain.pojo.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class BlogVo {
    private Integer id;

    private Integer userId;
    private Date date;
    private String title;
    private String content;
    private String tagName;
    private String coverUrl;
    private int state;
    private int access;

    private String username;
    private String author;

    private int goodNum;
    private int commentNum;

    boolean isGood;
}
