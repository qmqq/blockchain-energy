package com.eeler.eblockchain.service;

import com.eeler.eblockchain.dataobject.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:18
 */
public interface ItemService {

    /**
     * 创建订单（电量商品化）
     * @param item
     * @return
     */
    Item create(Item item);

    /**
     * 出售
     * @param itemId
     * @param price
     * @return
     */
    Item sale(String itemId, BigDecimal price);

    /**
     * 根据卖家合约地址查询订单列表
     * @param sellerAddress
     * @param pageable
     * @return
     */
    Page<Item> findList(String sellerAddress, Pageable pageable);

    /**
     * 根据状态查询订单列表
     * @param status
     * @param pageable
     * @return
     */
    Page<Item> findList(Integer status, Pageable pageable);

    /**
     * 根据卖家合约地址和状态查询订单列表
     * @param sellerAddress
     * @param status
     * @param pageable
     * @return
     */
    Page<Item> findList(String sellerAddress, Integer status, Pageable pageable);

    /**
     * 购买
     * @param itemId
     * @param buyerAddress
     * @return
     */
    Item buy(String itemId, String buyerAddress);

    Integer getCountByItemStatus(String sellerAddress, Integer status);

    Integer getCountByBuyerCount(String buyerAddress);

    Item createTradeId(String itemId, String tradeId);

    List<Item> getSellerTrade(String address);

    List<Item> getBuyerTrade(String address);
}
