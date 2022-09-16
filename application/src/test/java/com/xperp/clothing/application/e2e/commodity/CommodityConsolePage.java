package com.xperp.clothing.application.e2e.commodity;

import com.xperp.clothing.application.WebDriverHandler;
import com.xperp.clothing.application.commodity.NewCommodityForm;
import com.xperp.clothing.application.e2e.page.E2EPage;

public class CommodityConsolePage extends E2EPage {
    public CommodityConsolePage(WebDriverHandler webDriverHandler) {
        super(webDriverHandler);
    }

    @Override
    public void open() {
        webDriverHandler.open("/commodities");
    }

    public void clickButtonAdd() {
        findButton("新增").click();
    }

    public void inputCommodity(NewCommodityForm form) {

        getElementByPlaceHolder("商品链接").sendKeys(form.getUrl());
        getElementByPlaceHolder("店铺名称").sendKeys(form.getShopName());
        getElementByPlaceHolder("商品图片").sendKeys(form.getPic());
        getElementByPlaceHolder("商品价格").sendKeys(form.getPrice());
        getElementByPlaceHolder("商品id").sendKeys(form.getId());
    }

    public void clickButtonOK() {
        findButton("确定").click();
    }

    public Boolean hasText(String tip) {
        return containsText(tip);
    }

    public void waitNotification() {
        waitUntil(() -> hasText("Close Tip"), 1000);
    }
}
