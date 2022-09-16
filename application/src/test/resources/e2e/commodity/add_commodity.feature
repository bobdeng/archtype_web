Feature: 新增商品

  Scenario: 新增商品成功
    Given 没有商品
    And 以 "张三" 登录
    When 新增商品
    """
    {
      "url":"https://item.taobao.com/item.htm?id=682193112503",
      "pic":"https://img.alicdn.com/imgextra/i1/2212057803145/O1CN01wz6ueT1Z6SOzDp3jA_!!2212057803145.jpg",
      "shopName":"小李的店铺",
      "price":23.40,
      "id":682193112503
    }
    """
    Then 有 1 条商品
    And  提示 "操作成功"

  Scenario: 商品ID重复
    Given 已有商品
    """
    {
      "url":"https://item.taobao.com/item.htm?id=682193112503",
      "pic":"https://img.alicdn.com/imgextra/i1/2212057803145/O1CN01wz6ueT1Z6SOzDp3jA_!!2212057803145.jpg",
      "shopName":"小李的店铺",
      "price":23.40,
      "id":682193112503
    }
    """
    When 新增商品
    """
    {
      "url":"https://item.taobao.com/item.htm?id=682193112503",
      "pic":"https://img.alicdn.com/imgextra/i1/2212057803145/O1CN01wz6ueT1Z6SOzDp3jA_!!2212057803145.jpg",
      "shopName":"小李的店铺",
      "price":23.40,
      "id":682193112503
    }
    """
    Then 有 1 条商品
    And  提示 "商品ID已存在"
