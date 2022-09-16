package com.xperp.clothing.application.e2e.commodity;

import cn.bobdeng.testtools.SnapshotMatcher;
import com.google.gson.Gson;
import com.xperp.clothing.application.WebDriverHandler;
import com.xperp.clothing.application.commodity.NewCommodityForm;
import com.xperp.clothing.application.e2e.TenantService;
import com.xperp.clothing.application.e2e.page.ConsolePage;
import com.xperp.clothing.implemations.dao.CommodityDAO;
import com.xperp.clothing.implemations.dao.CommodityDO;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.stream.StreamSupport;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommoditySteps {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    WebDriverHandler webDriverHandler;
    @Autowired
    CommodityDAO commodityDAO;
    @Autowired
    TenantService tenantService;

    @Given("没有商品")
    public void 没有商品() {
        jdbcTemplate.execute("truncate table t_commodity");
    }

    @When("新增商品")
    public void 新增商品(String body) {
        new ConsolePage(webDriverHandler).open();
        CommodityConsolePage commodityConsolePage = new CommodityConsolePage(webDriverHandler);
        commodityConsolePage.open();
        commodityConsolePage.clickButtonAdd();
        NewCommodityForm form = new Gson().fromJson(body, NewCommodityForm.class);
        commodityConsolePage.inputCommodity(form);
        commodityConsolePage.clickButtonOK();
        commodityConsolePage.waitNotification();
    }

    @Then("有 {int} 条商品")
    public void 有条商品(int expectAmount) {
        List<CommodityDO> commodities = StreamSupport.stream(commodityDAO.findAll().spliterator(), false).toList();
        assertEquals(expectAmount, commodities.size());
        assertThat(commodities, SnapshotMatcher.snapshotMatch(this, "new_commodity"));
    }

    @And("提示 {string}")
    public void 提示(String tip) {
        CommodityConsolePage commodityConsolePage = new CommodityConsolePage(webDriverHandler);
        commodityConsolePage.waitUntil(() -> commodityConsolePage.hasText(tip), 1000);
    }

    @Given("已有商品")
    public void 已有商品(String body) {
    }
}
