package com.eeler.eblockchain.controller;

import com.eeler.eblockchain.VO.ResultPageVO;
import com.eeler.eblockchain.VO.ResultVO;
import com.eeler.eblockchain.converter.ItemForm2ItemConverter;
import com.eeler.eblockchain.dataobject.Item;
import com.eeler.eblockchain.dataobject.User;
import com.eeler.eblockchain.enums.ItemStatusEnum;
import com.eeler.eblockchain.enums.ResultEnum;
import com.eeler.eblockchain.exception.ItemException;
import com.eeler.eblockchain.form.ItemForm;
import com.eeler.eblockchain.service.ItemService;
import com.eeler.eblockchain.service.UserService;
import com.eeler.eblockchain.utils.ResultPageVOUtil;
import com.eeler.eblockchain.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:43
 */

@RestController
@RequestMapping("/seller")
@Slf4j
public class SellerController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResultVO<Map<String, String>> create(@RequestParam(value = "sellerAddress") String sellerAddress,
                                                @RequestParam(value = "amount")Integer amount) {
        Item item = new Item();
        item.setSellerAddress(sellerAddress);
        item.setAmount(amount);

        userService.reduceAmount(sellerAddress, amount);

        Item iResult = itemService.create(item);

        Map<String, String> map = new HashMap<>();
        map.put("itemId", iResult.getItemId());

        return ResultVOUtil.success(map);
    }

    @PostMapping("/create_tradeId")
    public ResultVO createTradeId(@RequestParam(value = "itemId") String itemId,
                                  @RequestParam(value = "tradeId") String tradeId) {
        Item item = itemService.createTradeId(itemId, tradeId);

        return ResultVOUtil.success();
    }

    @PostMapping("/sale")
    public ResultVO<Map<String, String>> sale(@RequestParam(value = "itemId") String itemId,
                                              @RequestParam(value = "price")BigDecimal price) {

        Item result = itemService.sale(itemId, price);

        Map<String, String> map = new HashMap<>();
        map.put("itemId", result.getItemId());

        return ResultVOUtil.success(map);
    }

    @GetMapping("/list_on_commercialization")
    public ResultPageVO<List> listOnCommercialization(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                         @RequestParam(value = "limit", defaultValue = "10") Integer size,
                                         @RequestParam(value = "sellerAddress") String sellerAddress) {
        PageRequest request = new PageRequest(page - 1, size);

        Page<Item> itemPage = itemService.findList(sellerAddress, ItemStatusEnum.COMMERCIALIZATION.getCode(), request);

        long count =itemPage.getTotalElements();

        List<Item> result = itemPage.getContent();

        return ResultPageVOUtil.success(count, result);
    }

    @GetMapping("/list_on_sale")
    public ResultPageVO<List> listOnSale(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                             @RequestParam(value = "limit", defaultValue = "10") Integer size,
                                             @RequestParam(value = "sellerAddress") String sellerAddress) {
        PageRequest request = new PageRequest(page - 1, size);

        Page<Item> itemPage = itemService.findList(sellerAddress, ItemStatusEnum.ON_SALE.getCode(), request);

        long count =itemPage.getTotalElements();

        List<Item> result = itemPage.getContent();

        return ResultPageVOUtil.success(count, result);
    }
}
