package com.xperp.clothing.application;

import cn.bobdeng.rbac.domain.rbac.AdminPassword;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@ConfigGenerated
public class AdminPasswordImpl implements AdminPassword.Notifier, AdminPassword.Store {
    private String password;

    @Override
    public void notify(String password) {
        log.info(password);
    }

    @Override
    public void save(String password) {
        this.password = password;
    }

    @Override
    public Optional<String> get() {
        return Optional.ofNullable(password);
    }
}
