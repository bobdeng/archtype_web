package com.xperp.clothing.commodity;


import cn.bobdeng.rbac.archtype.Entity;

public class Commodity implements Entity<Integer, CommodityDescription> {
    private Integer id;
    private CommodityDescription description;

    @Override
    public CommodityDescription description() {
        return description;
    }

    public Commodity(Integer id, CommodityDescription description) {
        this.id = id;
        this.description = description;
    }

    public Commodity(CommodityDescription description) {
        this.description = description;
    }

    @Override
    public Integer identity() {
        return id;
    }
}
