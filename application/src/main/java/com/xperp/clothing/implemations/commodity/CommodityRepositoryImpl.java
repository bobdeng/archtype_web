package com.xperp.clothing.implemations.commodity;

import com.xperp.clothing.commodity.Commodity;
import com.xperp.clothing.commodity.CommodityRepository;
import com.xperp.clothing.implemations.dao.CommodityDAO;
import com.xperp.clothing.implemations.dao.CommodityDO;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommodityRepositoryImpl implements CommodityRepository {
    private CommodityDAO commodityDAO;

    public CommodityRepositoryImpl(CommodityDAO goodsDAO) {
        this.commodityDAO = goodsDAO;
    }

    @Override
    public void save(Commodity commodity) {
        commodityDAO.save(new CommodityDO(commodity));
    }

    @Override
    public Optional<Commodity> findByIdOfPlatform(String id) {
        return commodityDAO.findByIdOfPlatform(id)
                .map(CommodityDO::toEntity);
    }
}
