package com.xperp.clothing.implemations.commodity;

import com.xperp.clothing.commodity.CommoditiesImpl;
import com.xperp.clothing.commodity.CommodityContext;
import com.xperp.clothing.commodity.CommodityRepository;
import org.springframework.stereotype.Service;

@Service
public class CommodityContextImpl implements CommodityContext {
    private final CommodityRepository commodityRepository;

    public CommodityContextImpl(CommodityRepository commodityRepository) {
        this.commodityRepository = commodityRepository;
    }

    @Override
    public Commodities commodities() {
        return new CommoditiesImpl(commodityRepository);
    }
}
