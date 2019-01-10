package com.eeler.eblockchain.repository;

import com.eeler.eblockchain.dataobject.Item;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 3:29
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemRepositoryTest {

    @Autowired
    private ItemRepository repository;
@Ignore
    @Test
    public void saveTest() {


        Item item = repository.findOne("sfasgasg");
//        Item item = new Item();
//        item.setItemId("sfasgasg");
//        item.setBuyerAddress("sdfagasdgas");
//        item.setSellerAddress("dgasdasfas");
//        item.setPrice(new BigDecimal(2.44));
//        item.setStatus(1);
//        item.setAmount(99);

        Item result = repository.save(item);

        Assert.assertNotEquals(null, result);
    }
}

