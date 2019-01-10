package com.eeler.eblockchain.enums;

import lombok.Getter;

/**
 * Created by 廖师兄
 * 2017-06-11 18:56
 */
@Getter
public enum ResultEnum {

    SUCCESS(0, "成功"),

    PARAM_ERROR(1, "参数不正确"),

    ITEM_NOT_EXIST(10, "订单不存在"),

    ITEM_STATUS_ERROR(11, "订单状态不正确"),

    ITEM_UPDATE_FAIL(12, "订单更新失败"),

    ITEM_FINISH_SUCCESS(13, "订单完结成功"),

    USER_NOT_EXIST(14, "用户不存在"),

    USER_UPDATE_FAIL(15, "用户电量更新失败"),

    AMOUNT_OVERSIZE(16, "用户电量过大"),
    ;

    private Integer code;

    private String message;

    ResultEnum(Integer code, String message) {
        this.code = code;
        this.message = message;

    }
}
