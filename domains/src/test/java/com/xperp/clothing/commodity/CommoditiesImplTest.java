package com.xperp.clothing.commodity;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CommoditiesImplTest {
    @Test
    public void should_throw_when_id_duplicate() {
        CommodityRepository commodityRepository = mock(CommodityRepository.class);
        String id = "123456";
        when(commodityRepository.findByIdOfPlatform(id)).thenReturn(Optional.of(new Commodity(null)));
        CommoditiesImpl commodities = new CommoditiesImpl(commodityRepository);
        DuplicateCommodityIdException e = assertThrows(DuplicateCommodityIdException.class,
                () -> commodities.add(CommodityDescription.builder().id(id).build()));
        assertEquals("商品ID已存在", e.getMessage());
    }
}