package com.example.blog.domain.pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Good {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    int blogId;
    int userId;
}
