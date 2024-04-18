package com.example.blog.dao;

import com.example.blog.domain.pojo.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findBlogsByUserIdAndState(int userId,int state);

    List<Blog> findBlogsByUserId(int userId);

    List<Blog> findBlogsByState(int state);

    List<Blog> findBlogsByStateAndTitleContaining(int state,String searchText);


}
