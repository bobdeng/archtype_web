package com.xperp.clothing.implemations;

import cn.bobdeng.rbac.domain.Tenant;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SQLInterceptor {
    private String sql;
    private String select;
    private String conditions;
    private static final String REGEX_TENANT_FIELD = ".*\\s(\\S+tenant_id)\\s.*";

    public SQLInterceptor(String sql) {
        this.sql = sql;
    }

    public String intercept(Tenant tenant) {
        splitSql();
        List<String> newConditions = getNewConditions(tenant);
        if (newConditions.isEmpty()) {
            return sql;
        }

        String newSql = "where " + String.join(" and ", newConditions);
        if ("".equals(conditions)) {
            return sql + " " + newSql;
        }
        return sql.replace("where", newSql + " and");
    }

    @NotNull
    private List<String> getNewConditions(Tenant tenant) {
        List<String> newConditions = new ArrayList<>();
        Pattern pattern = Pattern.compile(REGEX_TENANT_FIELD);
        Matcher matcher = pattern.matcher(select);
        while (matcher.find()) {
            String field = matcher.group(1);
            if (!conditions.contains(field)) {
                newConditions.add(field + "=" + tenant.identity());
            }
        }
        return newConditions;
    }

    private void splitSql() {
        String[] wheres = sql.split("where");
        select = wheres[0];
        conditions = wheres.length == 2 ? wheres[1] : "";
    }
}
