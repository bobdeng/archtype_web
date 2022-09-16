package com.xperp.clothing.commodity;

public class DuplicateCommodityIdException extends RuntimeException {
    @Override
    public String getMessage() {
        return "商品ID已存在";
    }
}
