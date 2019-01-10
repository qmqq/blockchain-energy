package com.eeler.eblockchain.service.Impl;

import com.eeler.eblockchain.dataobject.Item;
import com.eeler.eblockchain.enums.ItemStatusEnum;
import com.eeler.eblockchain.enums.ResultEnum;
import com.eeler.eblockchain.exception.ItemException;
import com.eeler.eblockchain.repository.ItemRepository;
import com.eeler.eblockchain.service.ItemService;
import com.eeler.eblockchain.utils.KeyUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:35
 */
@Service
@Slf4j
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository repository;

    @Override
    @Transactional
    public Item create(Item item) {

        String itemId = KeyUtil.genUniqueKey ();
        item.setItemId (itemId);
        item.setStatus (ItemStatusEnum.COMMERCIALIZATION.getCode ());
        item.setPrice (new BigDecimal (0.00));

        return repository.save (item);
    }

    @Override
    @Transactional
    public Item sale(String itemId, BigDecimal price) {

        Item item = repository.findOne (itemId);

        if (item == null) {
            throw new ItemException (ResultEnum.ITEM_NOT_EXIST);
        }

        if (!item.getStatus ().equals (ItemStatusEnum.COMMERCIALIZATION.getCode ())) {
            log.error ("【购买订单】订单状态不正确, itemId={}, status={}", item.getItemId (), item.getStatus ());
            throw new ItemException (ResultEnum.ITEM_STATUS_ERROR);
        }

        item.setPrice (price);
        item.setStatus (ItemStatusEnum.ON_SALE.getCode ());

        Item result = repository.save (item);

        if (result == null) {
            log.error ("【出售订单】更新失败, item={}", item);
            throw new ItemException (ResultEnum.ITEM_UPDATE_FAIL);
        }

        return item;
    }

    @Override
    public Page<Item> findList(String sellerAddress, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Item> findList(Integer status, Pageable pageable) {
        return repository.findByStatusOrderByUpdateTimeDesc (status, pageable);
    }

    @Override
    public Page<Item> findList(String sellerAddress, Integer status, Pageable pageable) {
        return repository.findBySellerAddressAndStatus (sellerAddress, status, pageable);
    }

    @Override
    public Item buy(String itemId, String buyerAddress) {

        Item item = repository.findOne (itemId);

        if (item == null) {
            throw new ItemException (ResultEnum.ITEM_NOT_EXIST);
        }

        if (!item.getStatus ().equals (ItemStatusEnum.ON_SALE.getCode ())) {
            log.error ("【购买订单】订单状态不正确, itemId={}, status={}", item.getItemId (), item.getStatus ());
            throw new ItemException (ResultEnum.ITEM_STATUS_ERROR);
        }

        item.setBuyerAddress (buyerAddress);
        item.setStatus (ItemStatusEnum.TRADE_SUCCESS.getCode ());

        Item result = repository.save (item);

        if (result == null) {
            log.error ("【完结订单】更新失败, item={}", item);
            throw new ItemException (ResultEnum.ITEM_UPDATE_FAIL);
        }

        return item;
    }

    @Override
    public Integer getCountByItemStatus(String sellerAddress, Integer status) {
        return repository.countBySellerAddressAndStatus (sellerAddress, status);
    }

    @Override
    public Integer getCountByBuyerCount(String buyerAddress) {
        return repository.countByBuyerAddress (buyerAddress);
    }

    @Override
    public Item createTradeId(String itemId, String tradeId) {
        Item item = repository.findOne (itemId);

        if (item == null) {
            throw new ItemException (ResultEnum.ITEM_NOT_EXIST);
        }

        item.setTradeId (tradeId);

        Item result = repository.save (item);

        if (result == null) {
            log.error ("【完结订单】更新失败, item={}", item);
            throw new ItemException (ResultEnum.ITEM_UPDATE_FAIL);
        }

        return item;
    }

    @Override
    public List<Item> getSellerTrade(String address) {
        return repository.findBySellerAddressAndStatusOrderByUpdateTimeDesc (address,
                ItemStatusEnum.TRADE_SUCCESS.getCode ());
    }

    @Override
    public List<Item> getBuyerTrade(String address) {
        return repository.findByBuyerAddressAndStatusOrderByUpdateTimeDesc (address,
                ItemStatusEnum.TRADE_SUCCESS.getCode ());
    }
}
