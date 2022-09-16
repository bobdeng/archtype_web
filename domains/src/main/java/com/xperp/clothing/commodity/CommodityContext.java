package com.xperp.clothing.commodity;


public interface CommodityContext {
    interface Commodities {
        void add(CommodityDescription commodityDescription);
    }

    Commodities commodities();
}
