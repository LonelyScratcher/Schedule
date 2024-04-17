package com.example.blog;

import com.example.blog.domain.pojo.User;
import com.example.blog.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

@SpringBootTest
class BlogApplicationTests {

	@Autowired
	UserService userService;


	@Test
	void contextLoads() {
		User user = userService.login("123", "123");
		System.out.println(user);
	}

	@Test
	void pathLoads() throws FileNotFoundException {
		long currentTimeMillis = System.currentTimeMillis();

		// 将毫秒数转换为字符串
		String timestamp = String.valueOf(currentTimeMillis);

		System.out.println("时间戳字符串：" + timestamp);
	}
}
