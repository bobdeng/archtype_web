package com.xperp.clothing.commodity;

import java.util.Optional;

public class CommoditiesImpl implements CommodityContext.Commodities {
    private final CommodityRepository commodityRepository;

    public CommoditiesImpl(CommodityRepository goodsRepository) {
        this.commodityRepository = goodsRepository;
    }

    @Override
    public void add(CommodityDescription description) {
        if (commodityRepository.findByIdOfPlatform(description.getId()).isPresent()) {
            throw new DuplicateCommodityIdException();
        }
        commodityRepository.save(new Commodity(description));
    }
}
