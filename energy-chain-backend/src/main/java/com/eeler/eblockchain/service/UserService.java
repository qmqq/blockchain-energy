package com.eeler.eblockchain.service;

import com.eeler.eblockchain.dataobject.User;

import java.math.BigDecimal;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/24 2:06
 */
public interface UserService {

    User getUserAmount(String address);

    User addAmount(String address, Integer amount, BigDecimal price);

    User reduceAmount(String address, Integer amount);

    User addPrice(String address, BigDecimal price);

    User login(String address);

}
