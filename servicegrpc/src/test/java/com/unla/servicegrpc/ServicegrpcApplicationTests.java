package com.unla.servicegrpc;

import com.unla.servicegrpc.services.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
class ServicegrpcApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void traerProductosConFotos(){

		ProductServiceImpl productService = null;

		productService.findByUserId(2);
	}
}
