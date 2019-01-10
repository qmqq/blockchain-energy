package com.eeler.eblockchain.repository;

import com.eeler.eblockchain.dataobject.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/24 2:05
 */
public interface UserRepository extends JpaRepository<User, String> {
}

