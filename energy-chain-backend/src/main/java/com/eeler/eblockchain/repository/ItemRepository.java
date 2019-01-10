package com.eeler.eblockchain.repository;

import com.eeler.eblockchain.dataobject.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/13 3:28
 */
public interface ItemRepository extends JpaRepository<Item, String> {

    Page<Item> findByStatusOrderByUpdateTimeDesc(Integer status, Pageable pageable);

    Page<Item> findBySellerAddressAndStatus(String sellerAddress, Integer status, Pageable pageable);

    Integer countBySellerAddressAndStatus(String sellerAddress, Integer status);

    Integer countByBuyerAddress(String buyerAddress);

    List<Item> findBySellerAddressAndStatusOrderByUpdateTimeDesc(String sellerAddress, Integer status);

    List<Item> findByBuyerAddressAndStatusOrderByUpdateTimeDesc(String buyerAddress, Integer status);
}
