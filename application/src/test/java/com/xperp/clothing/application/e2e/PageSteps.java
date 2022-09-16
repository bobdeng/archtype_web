package com.xperp.clothing.application.e2e;

import com.xperp.clothing.application.e2e.page.E2EPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.HashMap;
import java.util.Map;

public class PageSteps {
    private static final Map<String, E2EPage> pages = new HashMap<>();
    private E2EPage e2EPage;

    public static void put(String name, E2EPage page) {
        pages.put(name, page);
    }

    @When("当打开 {string}")
    public void 当打开(String name) {
        e2EPage = pages.get(name);
        e2EPage.open();
    }

    @Then("页面标题是 {string}")
    public void 页面标题是(String title) {
        e2EPage.titleShouldBe(title);
    }

    @Then("页面有 {string} 按钮")
    public void 页面有按钮(String name) {
        e2EPage.waitUntil(() -> e2EPage.hasButton(name), 1000);

    }
}
