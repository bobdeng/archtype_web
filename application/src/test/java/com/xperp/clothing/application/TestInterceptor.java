package com.xperp.clothing.application;

import cn.bobdeng.rbac.domain.Tenant;
import cn.bobdeng.rbac.security.SessionStore;
import com.xperp.clothing.implemations.dao.CommodityDAO;
import com.xperp.clothing.implemations.dao.CommodityDO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestInterceptor extends IntegrationTest {
    @Autowired
    SessionStore sessionStore;
    @Autowired
    CommodityDAO commodityDAO;

    @Test
    public void should_auto_set_tenant_id() {
        sessionStore.setTenant(new Tenant(10, null));
        CommodityDO commodity = commodityDAO.save(CommodityDO.builder()
                .price("23.00")
                .shopName("xx的小店")
                .idOfPlatform("12321232")
                .pic("http://taobao.com/123")
                .url("https://taobao.com/index.html?123")
                .build());
        assertEquals(10, commodity.getTenantId());
    }

}
