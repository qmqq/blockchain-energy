package com.eeler.eblockchain.dataobject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 3:27
 */
@Entity
@DynamicUpdate
@Data
public class Item {

    @Id
    private String itemId;

    private String tradeId;

    private String sellerAddress;

    private String buyerAddress;

    private Integer amount;

    private BigDecimal price;

    private Integer status;

    private Date createTime;

    private Date updateTime;

}
