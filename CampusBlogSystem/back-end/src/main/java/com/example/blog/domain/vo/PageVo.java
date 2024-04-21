package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PageVo<T> {
    List<T> list;
    int totalPage;
    public PageVo(){}
}
