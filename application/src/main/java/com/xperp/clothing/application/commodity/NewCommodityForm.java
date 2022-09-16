package com.xperp.clothing.application.commodity;

import com.xperp.clothing.commodity.CommodityDescription;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Setter
@Getter
public class NewCommodityForm {
    @NotEmpty(message = "商品地址不能为空")
    private String url;
    @NotEmpty(message = "价格不能为空")
    private String price;
    @NotEmpty(message = "图片不能为空")
    private String pic;
    @NotEmpty(message = "店铺名称不能为空")
    private String shopName;
    @NotEmpty(message = "商品ID不能为空")
    private String id;

    public CommodityDescription toDescription() {
        return CommodityDescription.builder()
                .id(getId())
                .url(getUrl())
                .pic(getPic())
                .price(getPrice())
                .shopName(getShopName())
                .build();
    }
}
