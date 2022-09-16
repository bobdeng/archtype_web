package com.xperp.clothing.implemations.dao;

import com.xperp.clothing.commodity.Commodity;
import com.xperp.clothing.commodity.CommodityDescription;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "t_commodity")
public class CommodityDO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String shopName;
    private String price;
    private String url;
    private String pic;
    private String idOfPlatform;
    @Getter
    private Integer tenantId;

    public CommodityDO(Commodity commodity) {
        this.id = commodity.identity();
        this.pic = commodity.description().getPic();
        this.shopName = commodity.description().getShopName();
        this.price = commodity.description().getPrice();
        this.url = commodity.description().getUrl();
        this.idOfPlatform = commodity.description().getId();
    }

    public Commodity toEntity() {
        CommodityDescription description = CommodityDescription.builder()
                .id(idOfPlatform)
                .shopName(shopName)
                .price(price)
                .pic(pic)
                .url(url)
                .build();
        return new Commodity(id, description);
    }
}
