package com.xperp.clothing.implemations;

import cn.bobdeng.rbac.archtype.SystemDate;
import cn.bobdeng.rbac.security.Session;
import cn.bobdeng.rbac.security.SessionStore;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.CallbackException;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

@Service
@Slf4j
public class TenantInterceptor extends EmptyInterceptor implements HibernatePropertiesCustomizer {
    private final SessionStore sessionStore;
    private final List<FieldInterceptor> interceptors;

    public TenantInterceptor(SessionStore sessionStore) {
        this.sessionStore = sessionStore;
        interceptors = Arrays.asList(
                new FieldInterceptor(() -> sessionStore.getTenant().identity(), "tenantId"),
                new FieldInterceptor(SystemDate::now, "createdAt"),
                new FieldInterceptor(() -> sessionStore.get().map(Session::userId).orElse(null), "createdBy"));

    }

    @Override
    public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) throws CallbackException {
        if (sessionStore.getTenant() == null) {
            return false;
        }
        if (interceptors.stream().noneMatch(it -> it.needInterceptor(propertyNames))) {
            return false;
        }
        interceptors.forEach(interceptor -> interceptor.intercept(propertyNames, state));
        return true;
    }

    @Override
    public String onPrepareStatement(String sql) {
        if (sessionStore.getTenant() == null || !sql.startsWith("select")) {
            return sql;
        }
        String newSQL = new SQLInterceptor(sql).intercept(sessionStore.getTenant());
        log.debug("SQL before intercept:" + sql);
        log.debug("SQL after intercept:" + sql);
        return newSQL;
    }

    @Override
    public void customize(Map<String, Object> hibernateProperties) {
        hibernateProperties.put("hibernate.session_factory.interceptor", this);
    }


    public static final class FieldInterceptor {
        private final Supplier<Object> valueSupplier;
        private final String fieldName;

        public FieldInterceptor(Supplier<Object> valueSupplier,
                                String fieldName) {
            this.valueSupplier = valueSupplier;
            this.fieldName = fieldName;
        }

        public void intercept(String[] propertyNames, Object[] state) {
            for (int i = 0; i < propertyNames.length; i++) {
                if (propertyNames[i].equals(fieldName)) {
                    state[i] = valueSupplier.get();
                }
            }
        }

        public boolean needInterceptor(String[] propertyNames) {
            return Arrays.asList(propertyNames).contains(fieldName);
        }

    }
}
