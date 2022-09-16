package com.xperp.clothing.application.commodity;

import com.xperp.clothing.commodity.CommodityContext;
import com.xperp.clothing.commodity.CommodityDescription;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class CommodityApi {
    private CommodityContext commodityContext;

    public CommodityApi(CommodityContext commodityContext) {
        this.commodityContext = commodityContext;
    }

    @PostMapping("/api/1.0/commodities")
    public Object newCommodity(@RequestBody @Valid NewCommodityForm form) {
        CommodityDescription commodityDescription = form.toDescription();
        commodityContext.commodities().add(commodityDescription);
        return "";
    }

}
