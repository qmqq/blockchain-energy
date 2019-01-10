package com.eeler.eblockchain.enums;

import lombok.Getter;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 5:50
 */
@Getter
public enum ItemStatusEnum implements CodeEnum {

    COMMERCIALIZATION(1, "商品化"),

    ON_SALE(2, "在售"),

    TRADING(3, "交易中"),

    TRADE_SUCCESS(4, "交易成功"),
    ;

    private Integer code;

    private String message;

    ItemStatusEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }


}
