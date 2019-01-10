    layui.use(['form','layer', 'element'], function(){
        $ = layui.jquery;
        var form = layui.form
            ,layer = layui.layer
            ,element = layui.element;

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
                    form.val("formTest", {
                        "address": accountAddress
                    });
                } else {
                    alert("没有登录");
                }

            });
            // var timestamp =Date.parse(new Date());
            // console.log(timestamp);
        });

        //监听提交
        form.on('submit(add)', function(data){
            // console.log(data.field.quantity);
            commer_item(data.field.quantity);
            return false;
        });


    });

    function commer_item(quant) {

        window.web3.eth.getAccounts(function (error, accounts) {
            //判断获取账号是否出错，提示用户可能没有登录或其他情况,参考那个猫的
            if (error) {
                console.log(error);
            }
            // 通过ABI和地址获取已部署的合约对象
            var SaleClockAuction = web3.eth.contract(SaleClockAuctionAbi).at(SaleClockAuctionAddress);
            //监听成功事件
            // var event = SaleClockAuction.CreateItem();
            // var iFlag = 0, iText = "";
            // event.watch(function (error, result) {
            //     if (error) {
            //         iFlag = 3;
            //         iText = "操作失败，请稍候再试！";
            //         console.log(error);
            //     } else {
            //         iFlag = 0;
            //         iText = "操作成功！";
            //         console.log("Event are as following:-------");
            //         console.log(result);
            //     }
            // });
            console.log(accounts[0]);
            //获取当前用户信息

            var re_data = {
                sellerAddress: accountAddress,
                amount: quant
            };
            var res = request("seller/create",re_data, false, 'POST');
            if (res.code == 0) {
                var itemId = res.data.itemId;

                var timestamp =Date.parse(new Date());
                SaleClockAuction.createItem(itemId, 1, quant, timestamp, accountAddress, {from: accounts[0]}, function (error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(result);
                        var re_datas = {
                            itemId: itemId,
                            tradeId: result
                        };
                        var ress = request("seller/create_tradeId",re_datas, false, 'POST');
                        if (ress.code == 0) {
                            layer.msg("发起售电成功");
                            setTimeout(function () {
                                //当你在iframe页面关闭自身时
                                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                window.parent.location.reload();
                                parent.layer.close(index); //再执行关闭
                            }, 1000);
                        }
                    }
                });

            } else {
                layer.msg("发起售电失败");
            }

        });
    }


