package com.xperp.clothing.implemations;

import cn.bobdeng.rbac.archtype.SystemDate;
import cn.bobdeng.rbac.domain.Tenant;
import cn.bobdeng.rbac.security.Session;
import cn.bobdeng.rbac.security.SessionStore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TenantInterceptorTest {
    public static final int user_id = 102;
    public static final int tenant_id = 101;
    private SessionStore sessionStore;
    private Tenant tenant;
    private TenantInterceptor tenantInterceptor;

    @BeforeEach
    public void setup() {
        sessionStore = mock(SessionStore.class);
        Session session = mock(Session.class);
        when(session.userId()).thenReturn(user_id);
        when(sessionStore.get()).thenReturn(Optional.of(session));
        tenant = new Tenant(tenant_id, null);
        when(sessionStore.getTenant()).thenReturn(tenant);
        tenantInterceptor = new TenantInterceptor(sessionStore);
    }

    @Test
    public void set_tenant_id_when_has_tenant_id() {
        ObjectHasTenantId object = new ObjectHasTenantId();
        Object[] state = new Object[1];
        tenantInterceptor.onSave(object, null, state, new String[]{"tenantId"}, null);
        assertEquals(tenant_id, state[0]);
    }

    @Test
    public void hen_has_no_tenant_id() {
        ObjectHasTenantId object = new ObjectHasTenantId();
        Object[] state = new Object[1];
        tenantInterceptor.onSave(object, null, state, new String[]{"abc"}, null);
        assertNull(state[0]);
    }

    @Test
    public void set_created_at() {
        SystemDate.setNowSupplier("2020-01-01 10:00:01");
        ObjectHasCreatedAt object = new ObjectHasCreatedAt();
        Object[] state = new Object[1];
        tenantInterceptor.onSave(object, null, state, new String[]{"createdAt"}, null);
        assertEquals(1577844001000L, state[0]);
    }

    @Test
    public void set_created_by() {
        ObjectHasCreatedBy object = new ObjectHasCreatedBy();
        Object[] state = new Object[1];
        tenantInterceptor.onSave(object, null, state, new String[]{"createdBy"}, null);
        assertEquals(user_id, state[0]);
    }

    @Test
    public void auto_add_tenant_id_when_has_tenant_field_and_no_tenant_condition() {
        String sql = tenantInterceptor.onPrepareStatement("select regulargue0_.id as id1_13_0_, regulargue0_.content as content2_13_0_, regulargue0_.created_at as created_3_13_0_, regulargue0_.created_by as created_4_13_0_, regulargue0_.goods_id as goods_id5_13_0_, regulargue0_.host_id as host_id6_13_0_, regulargue0_.tenant_id as tenant_i7_13_0_ from t_regular_guest_promotion regulargue0_ where regulargue0_.id=?");
        assertEquals(sql, "select regulargue0_.id as id1_13_0_, regulargue0_.content as content2_13_0_, regulargue0_.created_at as created_3_13_0_, regulargue0_.created_by as created_4_13_0_, regulargue0_.goods_id as goods_id5_13_0_, regulargue0_.host_id as host_id6_13_0_, regulargue0_.tenant_id as tenant_i7_13_0_ from t_regular_guest_promotion regulargue0_ where regulargue0_.tenant_id=101 and regulargue0_.id=?");
    }

    @Test
    public void auto_add_tenant_id_when_has_tenant_field_and_no_tenant_condition_and_no_where() {
        String sql = tenantInterceptor.onPrepareStatement("select regulargue0_.id as id1_13_0_, regulargue0_.content as content2_13_0_, regulargue0_.created_at as created_3_13_0_, regulargue0_.created_by as created_4_13_0_, regulargue0_.goods_id as goods_id5_13_0_, regulargue0_.host_id as host_id6_13_0_, regulargue0_.tenant_id as tenant_i7_13_0_ from t_regular_guest_promotion regulargue0_");
        assertEquals("select regulargue0_.id as id1_13_0_, regulargue0_.content as content2_13_0_, regulargue0_.created_at as created_3_13_0_, regulargue0_.created_by as created_4_13_0_, regulargue0_.goods_id as goods_id5_13_0_, regulargue0_.host_id as host_id6_13_0_, regulargue0_.tenant_id as tenant_i7_13_0_ from t_regular_guest_promotion regulargue0_ where regulargue0_.tenant_id=101", sql);
    }

    @Test
    public void only_interceptor_select() {
        String sql = tenantInterceptor.onPrepareStatement("insert into t_regular_guest_promotion (content, created_at, created_by, goods_id, host_id, tenant_id) values (?, ?, ?, ?, ?, ?)");
        assertEquals(sql, "insert into t_regular_guest_promotion (content, created_at, created_by, goods_id, host_id, tenant_id) values (?, ?, ?, ?, ?, ?)");
    }

    @Test
    public void not_append_when_already_has() {
        String sql = tenantInterceptor.onPrepareStatement("select regulargue0_.id as id1_13_, regulargue0_.content as content2_13_, regulargue0_.created_at as created_3_13_, regulargue0_.created_by as created_4_13_, regulargue0_.goods_id as goods_id5_13_, regulargue0_.host_id as host_id6_13_, regulargue0_.tenant_id as tenant_i7_13_ from t_regular_guest_promotion regulargue0_ where regulargue0_.tenant_id=? and regulargue0_.id<? order by regulargue0_.created_at DESC");
        assertEquals(sql, "select regulargue0_.id as id1_13_, regulargue0_.content as content2_13_, regulargue0_.created_at as created_3_13_, regulargue0_.created_by as created_4_13_, regulargue0_.goods_id as goods_id5_13_, regulargue0_.host_id as host_id6_13_, regulargue0_.tenant_id as tenant_i7_13_ from t_regular_guest_promotion regulargue0_ where regulargue0_.tenant_id=? and regulargue0_.id<? order by regulargue0_.created_at DESC");
    }

    public class ObjectHasTenantId {

        private Integer tenantId;

        public void setTenantId(Integer tenantId) {
            this.tenantId = tenantId;
        }

        public Integer getTenantId() {
            return tenantId;
        }
    }

    public class ObjectHasCreatedAt {
        private Long createdAt;

        public Long getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Long createdAt) {
            this.createdAt = createdAt;
        }
    }

    public class ObjectHasCreatedBy {
        private Integer createdBy;

        public Integer getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(Integer createdBy) {
            this.createdBy = createdBy;
        }
    }
}