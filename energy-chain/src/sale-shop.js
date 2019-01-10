layui.use(['laydate', 'laypage', 'layer', 'table', 'element'], function(){
    var layer = layui.layer //弹层
        ,table = layui.table //表格

    $(function(){
        window.web3.eth.getAccounts(function (error, accounts) {

            //  判断获取账号是否出错，提示用户可能没有登录或其他情况
            if (error) {
                console.log(error);
                // alert("没有登录");
            }
            if (accounts[0]) {
                accountAddress = accounts[0];
                console.log(accountAddress);

                var re_data = {
                    address: accountAddress
                };
                // debugger;
                var res = request("user/get_user_info",re_data, false, 'GET');
                var val;
                if (res.code == 0) {
                    val = res.data.tol_price;
                }
                $("#price").html(val);
            } else {
                alert("没有登录");
            }

        });

        $("#recharge").on('click', function () {
            layer.prompt({
                title : '请输入充值数'
            }, function(val, index){
                var reg = /^[0-9]*$/;
                if (!reg.test(val)) {
                    layer.alert("请输入数字");
                    return;
                }

                charge(val);
                layer.close(index);
            });
        })
    });

    //执行一个 table 实例
    table.render({
        elem: '#test'
        ,height: 400
        ,url: host + 'buyer/list_on_sale' //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {field: 'tradeId', title: '交易hash', width:540, fixed: 'left'}
            ,{field: 'amount', title: '电量', width:140}
            ,{field: 'price', title: '价格', width:140, sort: true}
            ,{field: 'status', title: '状态', width:140, templet: '#setStatus'}
            ,{field: 'createTime', title: '创建时间', width: 170, templet: '#createTime'}
            ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
        ]]
    });

    //监听工具条
    table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'detail'){
            layer.msg('查看操作');
        } else if(layEvent === 'buy'){
            //询问框
            layer.confirm('您确定要购买吗？', function(index){

                buy_item(data.itemId, data.price);
                layer.close(index);
            });
        } else if(layEvent === 'edit'){
            layer.msg('编辑操作');
        }
    });

});

function buy_item(itemId, price) {
    window.web3.eth.getAccounts(function (error, accounts) {
        //判断获取账号是否出错，提示用户可能没有登录或其他情况,参考那个猫的
        if (error) {
            console.log(error);
        }
        // 通过ABI和地址获取已部署的合约对象
        var SaleClockAuction = web3.eth.contract(SaleClockAuctionAbi).at(SaleClockAuctionAddress);

        console.log(accounts[0]);

        SaleClockAuction.buy(itemId, price, 4, accounts[0], {from: accounts[0], value: price}, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                // console.log(result);
                var re_data = {
                    itemId: itemId,
                    buyerAddress: accounts[0]
                };
                var res = request("buyer/buy",re_data, false, 'POST');
                if (res.code == 0) {
                    layer.msg("购买电量成功");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    layer.msg("购买电量失败");
                }
            }
        });
    });
}

function charge(val) {
    window.web3.eth.getAccounts(function (error, accounts) {
        //判断获取账号是否出错，提示用户可能没有登录或其他情况,参考那个猫的
        if (error) {
            console.log(error);
        }
        // 通过ABI和地址获取已部署的合约对象
        var SaleClockAuction = web3.eth.contract(SaleClockAuctionAbi).at(SaleClockAuctionAddress);

        console.log(accounts[0]);

        SaleClockAuction.recharge(accounts[0], val, {from: accounts[0]}, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                // console.log(result);

                var re_data = {
                    address:accounts[0],
                    price: val
                };

                var res = request("user/charge",re_data, false, 'POST');

                if (res.code == 0) {
                    layer.msg("充值成功");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    layer.msg("充值失败");
                }
            }
        });
    });
}
