Feature: 控制台页面

  Scenario: 已经登录后进入控制台
    Given 以 "张三" 登录
    When 当打开 "首页"
    Then 页面标题是 "ERP"
