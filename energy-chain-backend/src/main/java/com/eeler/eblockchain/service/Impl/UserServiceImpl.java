package com.eeler.eblockchain.service.Impl;

import com.eeler.eblockchain.dataobject.User;
import com.eeler.eblockchain.enums.ResultEnum;
import com.eeler.eblockchain.exception.UserException;
import com.eeler.eblockchain.repository.UserRepository;
import com.eeler.eblockchain.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/24 2:06
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public User getUserAmount(String address) {

        User user = repository.findOne (address);

        if (user == null) {
            throw new UserException (ResultEnum.USER_NOT_EXIST);
        }

        return user;
    }

    @Override
    public User addAmount(String address, Integer amount, BigDecimal price) {
        User user = repository.findOne (address);

        if (user == null) {
            throw new UserException (ResultEnum.USER_NOT_EXIST);
        }

        user.setAmount (user.getAmount () + amount);

        if (user.getTolPrice ().compareTo (price) < 0) {
            throw new UserException (ResultEnum.USER_UPDATE_FAIL);
        }

        user.setTolPrice (user.getTolPrice ().subtract (price));
        User result = repository.save (user);

        if (result == null) {
            log.error ("【更新用户】增加电量失败, user={}", user);
            throw new UserException (ResultEnum.USER_UPDATE_FAIL);
        }

        return user;
    }

    @Override
    public User reduceAmount(String address, Integer amount) {
        User user = repository.findOne (address);

        if (user == null) {
            throw new UserException (ResultEnum.USER_NOT_EXIST);
        }

        if (user.getAmount () < amount) {
            throw new UserException (ResultEnum.AMOUNT_OVERSIZE);
        }

        user.setAmount (user.getAmount () - amount);

        User result = repository.save (user);

        if (result == null) {
            log.error ("【更新用户】减少电量失败, user={}", user);
            throw new UserException (ResultEnum.USER_UPDATE_FAIL);
        }

        return user;
    }

    @Override
    public User addPrice(String address, BigDecimal price) {
        User user = repository.findOne (address);

        if (user == null) {
            throw new UserException (ResultEnum.USER_NOT_EXIST);
        }

        user.setTolPrice (user.getTolPrice ().add (price));

        User result = repository.save (user);

        if (result == null) {
            log.error ("【更新用户】减少电量失败, user={}", user);
            throw new UserException (ResultEnum.USER_UPDATE_FAIL);
        }

        return user;
    }

    @Override
    public User login(String address) {
        User user = repository.findOne (address);

        if (user == null) {
            User newUser = new User ();
            newUser.setAddress (address);
            newUser.setTolPrice (new BigDecimal (0));
            newUser.setAmount (0);
            repository.save (newUser);
            user = newUser;
        }
        return user;
    }
}
