package com.example.blog.dao;

import com.example.blog.domain.pojo.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findBlogsByUserIdAndState(int userId,int state);
    List<Blog> findBlogsByUserIdAndStateNot(int userId,int state);
    List<Blog> findBlogsByUserId(int userId);

    List<Blog> findBlogsByState(int state);
    Page<Blog> findByStateAndTagNameContains(int state,String tagName,Pageable pageable);

    List<Blog> findBlogsByStateAndTitleContaining(int state,String searchText);



}
