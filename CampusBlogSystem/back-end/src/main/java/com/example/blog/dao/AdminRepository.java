package com.example.blog.dao;

import com.example.blog.domain.pojo.Admin;
import com.example.blog.domain.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
