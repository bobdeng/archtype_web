package com.xperp.clothing.commodity;

import java.util.Optional;

public interface CommodityRepository {
    void save(Commodity commodity);

    Optional<Commodity> findByIdOfPlatform(String id);
}
