package com.primephil.restapidemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.primephil")
public class RestapidemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestapidemoApplication.class, args);
	}

}
