package com.eeler.eblockchain.controller;

import com.eeler.eblockchain.VO.ResultPageVO;
import com.eeler.eblockchain.VO.ResultVO;
import com.eeler.eblockchain.dataobject.Item;
import com.eeler.eblockchain.enums.ItemStatusEnum;
import com.eeler.eblockchain.service.ItemService;
import com.eeler.eblockchain.service.UserService;
import com.eeler.eblockchain.utils.ResultPageVOUtil;
import com.eeler.eblockchain.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 5:23
 */
@RestController
@RequestMapping("/buyer")
@Slf4j
public class BuyerController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @GetMapping("/list_on_sale")
    public ResultPageVO<List> listOnSale(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                         @RequestParam(value = "limit", defaultValue = "10") Integer size) {
        PageRequest request = new PageRequest(page - 1, size);

        Page<Item> itemPage = itemService.findList(ItemStatusEnum.ON_SALE.getCode(), request);

        List<Item> result = itemPage.getContent();

        long count = itemPage.getTotalElements();

        return ResultPageVOUtil.success(count, result);
    }

    @PostMapping("/buy")
    public ResultVO<Map<String, String>> buy(@RequestParam(value = "itemId", required = true) String itemId,
                                             @RequestParam(value = "buyerAddress", required = true) String buyerAddress) {

        Item result = itemService.buy(itemId, buyerAddress);

        userService.addAmount(buyerAddress, result.getAmount(), result.getPrice());

        userService.addPrice(result.getSellerAddress(), result.getPrice());

        Map<String, String> map = new HashMap<>();
        map.put("itemId", result.getItemId());

        return ResultVOUtil.success(map);
    }

}
