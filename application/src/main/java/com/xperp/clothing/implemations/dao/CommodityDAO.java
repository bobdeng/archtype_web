package com.xperp.clothing.implemations.dao;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CommodityDAO extends CrudRepository<CommodityDO, Integer> {
    Optional<CommodityDO> findByIdOfPlatform(String id);
}
