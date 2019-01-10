package com.eeler.eblockchain.form;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:19
 */
@Data
public class ItemForm {

    @NotEmpty(message = "卖家合约地址")
    private String sellerAddress;

    @NotNull(message = "数量")
    private Integer amount;

    @NotNull(message = "价格")
    private BigDecimal price;

    @NotNull(message = "交易状态")
    private Integer status;
}
