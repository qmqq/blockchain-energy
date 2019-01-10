// require('script-loader!./assets/js/extend.js');

var myApp = angular.module('myApp', []);

myApp.controller('MainController', function ($scope, $http) {
    $scope.addr = null;
    $scope.workError = {};

    window.addEventListener('load', function() {

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use the browser's ethereum provider
            var provider = web3.currentProvider;
            //判断账号是否登录
            window.web3.eth.getAccounts(function (error, accounts) {
                //判断当前网络不是在rinkeby下面需要给出提示。目前测试状态下是选择rinkeby网络，正式发布之后是判断主网络
                web3.version.getNetwork((err, netId) => {
                    switch (netId) {
                        case "1":
                            console.log('This is mainnet');
                            break;
                        case "2":
                            console.log('This is the deprecated Morden test network.');
                            break;
                        case "3":
                            console.log('This is the ropsten test network.');
                            break;
                        case "4":
                            console.log('This is the rinkeby test network.');
                            break;
                        default:
                            console.log('This is an unknown network.' + netId);
                    }
                    //当前处于rinkeby下
                    if(netId == "4"){
                        $scope.$apply(function () {
                            $scope.workError.networkError = false;
                        });
                    }else{
                        $scope.$apply(function () {
                            $scope.workError.networkError = true;
                        });
                    }
                    if (accounts[0]) {
                        $scope.$apply(function () {
                            $scope.addr = accounts[0];
                        });
                    }else if(!$scope.workError.networkError && !accounts[0]){
                        // 网络正确，但未登录metamask
                        $scope.$apply(function () {
                            $scope.workError.signError = true;
                            var accountInterval = setInterval(function() {
                                if (web3.eth.accounts[0]) {
                                    window.location.reload();
                                }
                            }, 100);
                        });
                    }
                    if(!$scope.workError.web3Error && !$scope.workError.networkError && !$scope.workError.signError){
                        var re_data = {
                            address: accounts[0]
                        };
                        var res = request("user/login",re_data, false, 'POST');
                        if (res.code == 0) {
                            window.location.href = "admin.html";
                        }
                    }
                })
                //判断获取账号是否出错，提示用户可能没有登录或其他情况,参考那个猫的
                if (error) {
                    console.log(error);
                }

            });
        } else {
            console.log('No web3? You should consider trying MetaMask!');
            $scope.$apply(function () {
                $scope.workError.web3Error = true;
            });
        }
    })

});


layui.use('element', function(){
    var element = layui.element;
});