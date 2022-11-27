package com.example.websocketi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


@Configuration
@PropertySource("classpath:application-mysql.properties")
@SpringBootApplication
public class WebsocketIApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsocketIApplication.class, args);
	}

}
