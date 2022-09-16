package com.xperp.clothing.commodity;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CommodityDescription {
    private String url;
    private String pic;
    private String shopName;
    private String price;
    private String id;
}
