package com.eeler.eblockchain.converter;

import com.eeler.eblockchain.dataobject.Item;
import com.eeler.eblockchain.form.ItemForm;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 4:53
 */
public class ItemForm2ItemConverter {

    public static Item convert(ItemForm itemForm) {

        Item item = new Item();

        item.setSellerAddress(itemForm.getSellerAddress());
        item.setStatus(itemForm.getStatus());
        item.setAmount(itemForm.getAmount());
        item.setPrice(itemForm.getPrice());

        return item;
    }
}
