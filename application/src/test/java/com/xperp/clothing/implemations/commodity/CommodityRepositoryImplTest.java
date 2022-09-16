package com.xperp.clothing.implemations.commodity;

import cn.bobdeng.rbac.domain.Tenant;
import cn.bobdeng.rbac.security.SessionStore;
import com.xperp.clothing.application.IntegrationTest;
import com.xperp.clothing.commodity.CommodityRepository;
import com.xperp.clothing.implemations.dao.CommodityDAO;
import com.xperp.clothing.implemations.dao.CommodityDO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class CommodityRepositoryImplTest extends IntegrationTest {
    @Autowired
    CommodityDAO commodityDAO;
    @Autowired
    SessionStore sessionStore;
    @Autowired
    CommodityRepository commodityRepository;

    @Test
    void should_search_by_id() {
        sessionStore.setTenant(new Tenant(10, null));
        commodityDAO.save(CommodityDO.builder()
                .idOfPlatform("123")
                .tenantId(10)
                .price("2033")
                .pic("htt")
                .url("123")
                .shopName("111")
                .build());
        assertTrue(commodityRepository.findByIdOfPlatform("123").isPresent());
    }

    @Test
    void should_not_search_by_id_when_tenant_not_same() {
        sessionStore.setTenant(new Tenant(11, null));
        commodityDAO.save(CommodityDO.builder()
                .idOfPlatform("123")
                .tenantId(11)
                .price("2033")
                .pic("htt")
                .url("123")
                .shopName("111")
                .build());
        sessionStore.setTenant(new Tenant(10, null));
        assertFalse(commodityRepository.findByIdOfPlatform("123").isPresent());
    }
}