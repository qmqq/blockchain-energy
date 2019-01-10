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
            $("#address").html(accountAddress);
            var re_data = {
                address: accountAddress
            };
            // debugger;
            var res = request("user/get_user_info",re_data, false, 'GET');
            var val1, val2, val3, val4, val5, val6;
            if (res.code == 0) {
                val1 = res.data.amount;
                val2 = res.data.tol_price;
                val3 = res.data.commerCount;
                val4 = res.data.saleCount;
                val5 = res.data.finishCount;
                val6 = res.data.buyCount;
            }

            $("#amount").html(val1);
            $("#tol_price").html(val2);
            $("#commerCount").html(val3);
            $("#saleCount").html(val4);
            $("#finishCount").html(val5);
            $("#buyCount").html(val6);
        } else {
            alert("没有登录");
        }

    });

});

setInterval(function() {
    var now = (new Date()).toLocaleString();
    $('#current-time').text(now);
}, 1000);

