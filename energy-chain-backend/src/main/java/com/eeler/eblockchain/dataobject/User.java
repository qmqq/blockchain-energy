package com.eeler.eblockchain.dataobject;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/24 2:03
 */
@Entity
@Data
public class User {

    @Id
    private String address;

    private Integer amount;

    private BigDecimal tolPrice;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public BigDecimal getTolPrice() {
        return tolPrice;
    }

    public void setTolPrice(BigDecimal tolPrice) {
        this.tolPrice = tolPrice;
    }

}
