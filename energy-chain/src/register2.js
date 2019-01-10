layui.use('form', function(){
    var form = layui.form;

    //监听提交
    form.on('submit(register)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});