package com.eeler.eblockchain.service.Impl;

import com.eeler.eblockchain.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:39
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class ItemServiceImplTest {

    @Autowired
    private ItemService itemService;
@Ignore
    @Test
    public void saleTest() {
//        Item item = new Item();
//        item.setPrice(new BigDecimal(32.2));
//        item.setSellerAddress("sssscsdff");
//        item.setAmount(23);
//        item.setStatus(1);
//
//        Item result = itemService.sale(item);
//
//        Assert.assertNotEquals(null, result);
    }

}