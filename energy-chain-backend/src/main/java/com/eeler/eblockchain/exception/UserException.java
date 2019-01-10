package com.eeler.eblockchain.exception;

import com.eeler.eblockchain.enums.ResultEnum;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/24 2:18
 */
public class UserException extends RuntimeException {

    private Integer code;

    public UserException(ResultEnum resultEnum) {
        super(resultEnum.getMessage());

        this.code = resultEnum.getCode();
    }

    public UserException(Integer code, String message) {
        super(message);
        this.code = code;
    }
}
