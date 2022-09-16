package com.xperp.clothing.application.e2e;

import cn.bobdeng.rbac.domain.*;
import cn.bobdeng.rbac.domain.rbac.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class TenantService {
    TenantRepository tenantRepository;
    RbacContext rbacContext;
    private Tenant tenant;
    private User user;
    private DomainRepository domainRepository;
    private final JdbcTemplate jdbcTemplate;

    public TenantService(TenantRepository tenantRepository, RbacContext rbacContext, DomainRepository domainRepository, JdbcTemplate jdbcTemplate) {
        this.tenantRepository = tenantRepository;
        this.rbacContext = rbacContext;
        this.domainRepository = domainRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void init() {
        jdbcTemplate.execute("truncate table t_rbac_tenant");
        jdbcTemplate.execute("truncate table t_rbac_user");
        jdbcTemplate.execute("truncate table t_rbac_login_name");
        jdbcTemplate.execute("truncate table t_rbac_password");
        jdbcTemplate.execute("truncate table t_rbac_domain");
        jdbcTemplate.execute("truncate table t_rbac_role");
        jdbcTemplate.execute("truncate table t_rbac_user_role");
        jdbcTemplate.execute("truncate table t_rbac_organization");

        Domains domains = new Domains(domainRepository);
        Tenants tenants = new Tenants(tenantRepository);
        tenant = tenants.add(new TenantDescription("Bob公司"));
        domains.newDomain(new DomainDescription("localhost:8080", tenant.identity()));
        domains.newDomain(new DomainDescription("localhost", tenant.identity()));
        domains.newDomain(new DomainDescription("host.docker.internal", tenant.identity()));
        domains.newDomain(new DomainDescription("host.testcontainers.internal", tenant.identity()));
        RbacContext.Rbac rbac = rbacContext.asRbac(tenant);
        user = rbac.addUser(new UserDescription("张三"));
        rbac.addLoginName(new LoginNameDescription("zhangsan", user.getId()));
        user.savePassword(new RawPassword("123456"));
    }

    public Tenant getTenant() {
        return tenant;
    }

    public User userByLoginName(String loginName) {
        return user;
    }
}
