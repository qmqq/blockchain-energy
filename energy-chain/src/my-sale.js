$(function(){
    window.web3.eth.getAccounts(function (error, accounts) {

        //  判断获取账号是否出错，提示用户可能没有登录或其他情况
        if (error) {
            console.log(error);
            // alert("没有登录");
        }
        if (accounts[0]) {
            accountAddress = accounts[0];
            // console.log(accountAddress);

            var re_data = {
                address: accounts[0]
            };
            // debugger;
            var res = request("user/get_user_info",re_data, false, 'GET');
            var val;
            if (res.code == 0) {
                val = res.data.amount;
            }
            $("#amount").html(val);
        } else {
            alert("没有登录");
        }

    });
});

layui.use(['laydate', 'laypage', 'layer', 'table', 'element'], function(){
    var laydate = layui.laydate //日期
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element; //元素操作

    //执行一个 table 实例
    table.render({
        elem: '#test'
        ,height: 400
        ,url: host + 'seller/list_on_commercialization?sellerAddress=' + accountAddress //数据接口
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
        } else if(layEvent === 'sale'){
            layer.prompt({
                title : '请输入出售价格'
            }, function(val, index){
                var reg = /^[0-9]*$/;
                if (!reg.test(val)) {
                    layer.alert("请输入数字");
                    return;
                }
                // layer.msg('id' + data.itemId + '得到了'+val);
                sale_item(data.itemId, val);
                layer.close(index);
            });
        } else if(layEvent === 'edit'){
            layer.msg('编辑操作');
        }
    });

});

/*用户-停用*/
function member_stop(obj,id){
    layer.confirm('确认要停用吗？',function(index){

        if($(obj).attr('title')=='启用'){

            //发异步把用户状态进行更改
            $(obj).attr('title','停用')
            $(obj).find('i').html('&#xe62f;');

            $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
            layer.msg('已停用!',{icon: 5,time:1000});

        }else{
            $(obj).attr('title','启用')
            $(obj).find('i').html('&#xe601;');

            $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
            layer.msg('已启用!',{icon: 5,time:1000});
        }

    });
}

/*用户-删除*/
function member_del(obj,id){
    layer.confirm('确认要删除吗？',function(index){
        //发异步删除数据
        $(obj).parents("tr").remove();
        layer.msg('已删除!',{icon:1,time:1000});
    });
}



function delAll (argument) {

    var data = tableCheck.getData();

    layer.confirm('确认要删除吗？'+data,function(index){
        //捉到所有被选中的，发异步进行删除
        layer.msg('删除成功', {icon: 1});
        $(".layui-form-checked").not('.header').parents('tr').remove();
    });
}

function sale_item(itemId, price) {

    window.web3.eth.getAccounts(function (error, accounts) {
        //判断获取账号是否出错，提示用户可能没有登录或其他情况,参考那个猫的
        if (error) {
            console.log(error);
        }
        // 通过ABI和地址获取已部署的合约对象
        var SaleClockAuction = web3.eth.contract(SaleClockAuctionAbi).at(SaleClockAuctionAddress);

        console.log(accounts[0]);

        SaleClockAuction.sale(itemId, 2, price, accounts[0], {from: accounts[0]}, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                // console.log(result);
                var re_data = {
                    itemId: itemId,
                    price: price
                };
                var res = request("seller/sale",re_data, false, 'POST');
                if (res.code == 0) {
                    layer.msg("挂售电成功");
                    window.location.reload();
                } else {
                    layer.msg("挂售电失败");
                }
            }
        });
    });
}