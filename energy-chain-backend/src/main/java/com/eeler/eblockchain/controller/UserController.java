package com.eeler.eblockchain.controller;

import com.eeler.eblockchain.VO.ResultVO;
import com.eeler.eblockchain.dataobject.Item;
import com.eeler.eblockchain.dataobject.User;
import com.eeler.eblockchain.enums.ItemStatusEnum;
import com.eeler.eblockchain.service.ItemService;
import com.eeler.eblockchain.service.UserService;
import com.eeler.eblockchain.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sigmod
 * <info>message</info>
 * on 2018/6/24 2:13
 */
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ItemService itemService;

    @PostMapping("/login")
    public ResultVO login(@RequestParam("address") String address) {

        userService.login (address);

        return ResultVOUtil.success ();
    }

    @GetMapping("/get_user_info")
    public ResultVO<Map<String, Integer>> getUserAmount(@RequestParam("address") String address) {

        User user = userService.getUserAmount (address);

        Map<String, Integer> map = new HashMap<> ();

        map.put ("amount", user.getAmount ());
        map.put ("tol_price", user.getTolPrice ().intValue ());

        int commerCount = itemService.getCountByItemStatus (address, ItemStatusEnum.COMMERCIALIZATION.getCode ());

        int saleCount = itemService.getCountByItemStatus (address, ItemStatusEnum.ON_SALE.getCode ());

        int finishCount = itemService.getCountByItemStatus (address, ItemStatusEnum.TRADE_SUCCESS.getCode ());

        int buyCount = itemService.getCountByBuyerCount (address);

        map.put ("commerCount", commerCount);
        map.put ("saleCount", saleCount);
        map.put ("finishCount", finishCount);
        map.put ("buyCount", buyCount);

        return ResultVOUtil.success (map);
    }

    @PostMapping("/charge")
    public ResultVO charge(@RequestParam("address") String address,
                           @RequestParam("price") BigDecimal price) {
        userService.addPrice (address, price);

        return ResultVOUtil.success ();
    }

    @GetMapping("/get_trade_history")
    public ResultVO<Map<String, Object>> getTradeHistory(@RequestParam("address") String address) {
        List<Item> sellerItemList = itemService.getSellerTrade (address);

        List<Item> buyerItemList = itemService.getBuyerTrade (address);

        Map<String, Object> map = new HashMap<> ();

        map.put ("seller", sellerItemList);
        map.put ("buyer", buyerItemList);

        return ResultVOUtil.success (map);
    }
}
