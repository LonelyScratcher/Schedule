package com.example.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorInfo {
    InfoItem[] generalAttr;
    InfoItem[] detailAttr;
}
