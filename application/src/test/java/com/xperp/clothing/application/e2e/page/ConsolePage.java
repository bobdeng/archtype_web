package com.xperp.clothing.application.e2e.page;

import cn.bobdeng.rbac.Cookies;
import cn.bobdeng.rbac.api.UserToken;
import cn.bobdeng.rbac.domain.rbac.User;
import com.xperp.clothing.application.WebDriverHandler;
import com.xperp.clothing.application.e2e.PageSteps;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class ConsolePage extends E2EPage {
    @PostConstruct
    public void init() {
        PageSteps.put("首页", this);
    }

    public ConsolePage(WebDriverHandler webDriverHandler) {
        super(webDriverHandler);
    }

    @Override
    public void open() {
        webDriverHandler.open("/console");
    }

    public void loginWith(User user) {
        webDriverHandler.removeAllCookies();
        setCookie(Cookies.AUTHORIZATION, new UserToken(user).toTokenString());
    }

    public void logout() {
        webDriverHandler.removeAllCookies();
    }
}
