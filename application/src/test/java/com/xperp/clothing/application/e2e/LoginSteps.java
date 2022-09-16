package com.xperp.clothing.application.e2e;

import cn.bobdeng.rbac.domain.rbac.User;
import cn.bobdeng.rbac.security.SessionStore;
import com.xperp.clothing.application.Application;
import com.xperp.clothing.application.e2e.page.ConsolePage;
import io.cucumber.java.en.Given;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@ActiveProfiles(profiles = "ac")
@ContextConfiguration(classes = {Application.class}, loader = SpringBootContextLoader.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@CucumberContextConfiguration
public class LoginSteps {
    @Autowired
    TenantService tenantService;
    @Autowired
    ConsolePage consolePage;
    @Autowired
    SessionStore sessionStore;

    @Given("以 {string} 登录")
    public void 以登录(String loginName) {
        User user = tenantService.userByLoginName(loginName);
        sessionStore.setTenant(user.tenant());
        consolePage.open();
        consolePage.loginWith(user);
    }

    @Given("没有登录")
    public void 没有登录() {
        consolePage.open();
        consolePage.logout();
    }
}
