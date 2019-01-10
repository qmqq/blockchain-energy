package com.eeler.eblockchain.utils;

import com.eeler.eblockchain.VO.ResultPageVO;

/**
 * Created by sigmod
 * <p>
 * on 2018/6/18 21:12
 */
public class ResultPageVOUtil {

    public static ResultPageVO success(Long count, Object object) {
        ResultPageVO resultPageVO = new ResultPageVO();
        resultPageVO.setCount(count);
        resultPageVO.setData(object);
        resultPageVO.setCode(0);
        resultPageVO.setMsg("成功");
        return resultPageVO;
    }

    public static ResultPageVO success() {
        return success(null, null);
    }

    public static ResultPageVO error(Integer code, String msg) {
        ResultPageVO resultPageVO = new ResultPageVO();
        resultPageVO.setCode(code);
        resultPageVO.setMsg(msg);
        return resultPageVO;
    }
}
