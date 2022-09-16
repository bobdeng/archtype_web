package com.xperp.clothing.application.commodity;

import com.xperp.clothing.application.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

class CommodityApiTest extends IntegrationTest {
    @Autowired
    TestRestTemplate restTemplate;
    private NewCommodityForm form;

    @BeforeEach
    public void setup() {
        form = new NewCommodityForm();
        form.setUrl("http://taobao.com/");
        form.setPic("http://taobao.com");
        form.setPrice("23.00");
        form.setShopName("店铺名称");
        form.setId("123456");
    }

    @Test
    public void should_error_when_no_id() {
        shouldBadRequest(() -> form.setId(null), "商品ID不能为空");
        shouldBadRequest(() -> form.setId(""), "商品ID不能为空");
    }

    @Test
    public void should_error_when_no_url() {
        shouldBadRequest(() -> form.setUrl(null), "商品地址不能为空");
        shouldBadRequest(() -> form.setUrl(""), "商品地址不能为空");
    }
    @Test
    public void should_error_when_no_shopName() {
        shouldBadRequest(() -> form.setShopName(null), "店铺名称不能为空");
        shouldBadRequest(() -> form.setShopName(""), "店铺名称不能为空");
    }

    private void shouldBadRequest(Runnable setter, String error) {
        setter.run();
        ResponseEntity<String> response = restTemplate.postForEntity("/api/1.0/commodities", form, String.class);
        System.out.println(response.getBody());
        assertEquals(error, response.getBody());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}