package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class CommentVo {
    private Integer id;

    int blogId;
    int userId;
    int state;
    String content;
    String blogTitle;
    Date date;
    String author;
    String username;
    String avatarUrl;
}
