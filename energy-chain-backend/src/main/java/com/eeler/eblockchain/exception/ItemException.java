package com.eeler.eblockchain.exception;

import com.eeler.eblockchain.enums.ResultEnum;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:48
 */
public class ItemException extends RuntimeException {

    private Integer code;

    public ItemException(ResultEnum resultEnum) {
        super(resultEnum.getMessage());

        this.code = resultEnum.getCode();
    }

    public ItemException(Integer code, String message) {
        super(message);
        this.code = code;
    }
}
