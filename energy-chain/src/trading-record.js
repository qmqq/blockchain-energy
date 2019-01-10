$(function(){

    layui.use(['element', 'laytpl'], function(){
        var element = layui.element
            ,laytpl = layui.laytpl;

        window.web3.eth.getAccounts(function (error, accounts) {

            //  判断获取账号是否出错，提示用户可能没有登录或其他情况
            if (error) {
                console.log(error);
                // alert("没有登录");
            }
            if (accounts[0]) {
                var re_data = {
                    address: accounts[0]
                };
                var res = request("user/get_trade_history",re_data, false, 'GET');
                if (res.code == 0) {
                    var sell_data = res.data.seller;
                    var buy_data = res.data.buyer;

                    var getTpl1 = seller.innerHTML
                        ,sell = document.getElementById('sell')
                        ,getTpl2 = buyer.innerHTML
                        ,buy = document.getElementById('buy');

                    laytpl(getTpl1).render(sell_data, function(html){
                        sell.innerHTML = html;
                    });
                    laytpl(getTpl2).render(buy_data, function(html){
                        buy.innerHTML = html;
                    });
                } else {
                    layer.msg("获取交易记录失败");
                }
            } else {
                alert("没有登录");
            }

        });

    });

});