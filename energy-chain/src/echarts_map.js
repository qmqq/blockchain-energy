layui.use(['element', 'layer'], function(){
    var element = layui.element
        ,layer = layui.layer; //弹层

    var myChart1 = echarts.init(document.getElementById('main1'));

    var option1 = {
        title: {
            text: '杭州市微网发电量热力情况',
            x:'center'
        },
        color: ['gold','aqua','lime'],
        tooltip:{
            trigger:'item',
            formatter:'{b}'+':'+'发电{c}'
        },
        dataRange: {
            min : 0,
            max : 10000,
            calculable : true,
            color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
            textStyle:{
                color:'#000'
            }
        },
        series:[

            {
                name: 'hz_hot',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(35,143,252,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#0a2b4c'
                        }
                    }
                },
                data:[
                    {name: '淳安县', value: 9659.78},
                    {name: '下城区', value: 1659.78},
                    {name: '临安市', value: 2659.78},
                    {name: '拱墅区', value: 3659.78},
                    {name: '西湖区', value: 4659.78},
                    {name: '滨江区', value: 5659.78},
                    {name: '萧山区', value: 6659.78},
                    {name: '余杭区', value: 5180.97},
                    {name: '桐庐县', value: 5204.26},
                    {name: '上城区', value: 2190.9},
                    {name: '建德市', value: 4918.26},
                    {name: '富阳区', value: 8881.84},
                    {name: '江干区', value: 7178.01},
                ],

            },
        ]
    };

    myChart1.setOption(option1);

    var myChart2 = echarts.init(document.getElementById('main2'));

    var option2 = {
        title: {
            text: '杭州市微网交易量情况',
            x:'center'
        },
        color: ['gold','aqua','lime'],
        tooltip:{
            trigger:'item',
            formatter:function (params,ticket,callback) {

                console.log(params);
                if (params.series.name== '买入交易量') {
                    return params.name + ":" + params.percent;
                } else if (params.series.name== '卖出交易量') {
                    return params.name + ":" + params.percent;
                } else {
                    return params.name;
                }

            }
        },
        legend: {
            orient: 'vertical',
            x:'left',
            data:['买入交易量','卖出交易量'],
            selected:{
                '卖出交易量': false
            },
            textStyle: {
                color: 'red',
                fontSize: 14,
            },
        },
        dataRange: {
            min : 0,
            max : 100,
            calculable : true,
            color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
            textStyle:{
                color:'#000'
            }
        },
        series:[

            {
                name: '杭州区域',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(35,143,252,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#0a2b4c'
                        }
                    }
                },
                data:[],

            },
            {
                name: '点数量',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(100,149,237,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#1b1b1b'
                        }
                    }
                },
                data:[],
                markLine : {
                    smooth:true,
                    symbol: ['none', 'circle'],
                    symbolSize : 1,
                    itemStyle : {
                        normal: {
                            color:'#fff',
                            borderWidth:1,
                            borderColor:'rgba(30,144,255,0.5)'
                        }
                    },
                    data : [
                    ],
                },
                geoCoord: {
                    '淳安': [119.03,29.60],
                    '下城': [120.17,30.28],
                    '临安': [119.72,30.23],
                    '拱墅': [120.13,30.32],
                    '西湖': [120.13,30.27],
                    '滨江': [120.20,30.20],
                    '萧山': [120.27,30.17],
                    '余杭': [120.30,30.42],
                    '桐庐': [119.67,29.80],
                    '上城': [120.17,30.25],
                    '建德': [119.28,29.48],
                    '富阳': [119.95,30.05],
                    '江干': [120.20,30.27],
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 10 + v/10
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        },
                        emphasis: {
                            label:{position:'top'}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96.78},
                        {name: '下城', value: 16.78},
                        {name: '临安', value: 26.78},
                        {name: '拱墅', value: 36.78},
                        {name: '西湖', value: 46.78},
                        {name: '滨江', value: 56.78},
                        {name: '萧山', value: 66.78},
                        {name: '余杭', value: 51.97},
                        {name: '桐庐', value: 52.26},
                        {name: '上城', value: 21.9},
                        {name: '建德', value: 49.26},
                        {name: '富阳', value: 88.84},
                        {name: '江干', value: 78.01},
                    ]
                }
            },
            {
                name: '买入交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'淳安'}, {name: '建德', value: 86}],
                        [{name:'临安'}, {name: '建德', value: 66}],
                        [{name:'拱墅'}, {name: '建德', value: 56}],
                        [{name:'西湖'}, {name: '建德', value: 76}],
                        [{name:'滨江'}, {name: '建德', value: 56}],
                        [{name:'萧山'}, {name: '建德', value: 46}],
                        [{name:'余杭'}, {name: '建德', value: 71}],
                        [{name:'桐庐'}, {name: '建德', value: 82}],
                        [{name:'下城'}, {name: '建德', value: 99}],
                        [{name:'富阳'}, {name: '建德', value: 65}],
                        [{name:'江干'}, {name: '建德', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            },
            {
                name: '卖出交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'建德'}, {name: '淳安', value: 96}],
                        [{name:'建德'}, {name: '临安', value: 26}],
                        [{name:'建德'}, {name: '拱墅', value: 36}],
                        [{name:'建德'}, {name: '西湖', value: 46}],
                        [{name:'建德'}, {name: '滨江', value: 56}],
                        [{name:'建德'}, {name: '萧山', value: 66}],
                        [{name:'建德'}, {name: '余杭', value: 51}],
                        [{name:'建德'}, {name: '桐庐', value: 52}],
                        [{name:'建德'}, {name: '下城', value: 49}],
                        [{name:'建德'}, {name: '富阳', value: 85}],
                        [{name:'建德'}, {name: '江干', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            }
        ]
    };

    var option3 = {
        title: {
            text: '杭州市微网交易量情况',
            x:'center'
        },
        color: ['gold','aqua','lime'],
        tooltip:{
            trigger:'item',
            formatter:function (params,ticket,callback) {

                // console.log(params);
                if (params.series.name== '买入交易量') {
                    return params.name + ":" + params.percent;
                } else if (params.series.name== '卖出交易量') {
                    return params.name + ":" + params.percent;
                } else {
                    return params.name;
                }

            }
        },
        legend: {
            orient: 'vertical',
            x:'left',
            data:['买入交易量','卖出交易量'],
            selected:{
                '卖出交易量': false
            },
            textStyle: {
                color: 'red',
                fontSize: 14,
            },
        },
        dataRange: {
            min : 0,
            max : 100,
            calculable : true,
            color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
            textStyle:{
                color:'#000'
            }
        },
        series:[

            {
                name: '杭州区域',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(35,143,252,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#0a2b4c'
                        }
                    }
                },
                data:[],

            },
            {
                name: '点数量',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(100,149,237,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#1b1b1b'
                        }
                    }
                },
                data:[],
                markLine : {
                    smooth:true,
                    symbol: ['none', 'circle'],
                    symbolSize : 1,
                    itemStyle : {
                        normal: {
                            color:'#fff',
                            borderWidth:1,
                            borderColor:'rgba(30,144,255,0.5)'
                        }
                    },
                    data : [
                    ],
                },
                geoCoord: {
                    '淳安': [119.03,29.60],
                    '下城': [120.17,30.28],
                    '临安': [119.72,30.23],
                    '拱墅': [120.13,30.32],
                    '西湖': [120.13,30.27],
                    '滨江': [120.20,30.20],
                    '萧山': [120.27,30.17],
                    '余杭': [120.30,30.42],
                    '桐庐': [119.67,29.80],
                    '上城': [120.17,30.25],
                    '建德': [119.28,29.48],
                    '富阳': [119.95,30.05],
                    '江干': [120.20,30.27],
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 10 + v/10
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        },
                        emphasis: {
                            label:{position:'top'}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96.78},
                        {name: '下城', value: 16.78},
                        {name: '临安', value: 26.78},
                        {name: '拱墅', value: 36.78},
                        {name: '西湖', value: 46.78},
                        {name: '滨江', value: 56.78},
                        {name: '萧山', value: 66.78},
                        {name: '余杭', value: 51.97},
                        {name: '桐庐', value: 52.26},
                        {name: '上城', value: 21.9},
                        {name: '建德', value: 49.26},
                        {name: '富阳', value: 88.84},
                        {name: '江干', value: 78.01},
                    ]
                }
            },
            {
                name: '买入交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'建德'}, {name: '淳安', value: 86}],
                        [{name:'临安'}, {name: '淳安', value: 66}],
                        [{name:'拱墅'}, {name: '淳安', value: 56}],
                        [{name:'西湖'}, {name: '淳安', value: 76}],
                        [{name:'滨江'}, {name: '淳安', value: 56}],
                        [{name:'萧山'}, {name: '淳安', value: 46}],
                        [{name:'余杭'}, {name: '淳安', value: 71}],
                        [{name:'桐庐'}, {name: '淳安', value: 82}],
                        [{name:'下城'}, {name: '淳安', value: 99}],
                        [{name:'富阳'}, {name: '淳安', value: 65}],
                        [{name:'江干'}, {name: '淳安', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            },
            {
                name: '卖出交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'淳安'}, {name: '建德', value: 96}],
                        [{name:'淳安'}, {name: '临安', value: 26}],
                        [{name:'淳安'}, {name: '拱墅', value: 36}],
                        [{name:'淳安'}, {name: '西湖', value: 46}],
                        [{name:'淳安'}, {name: '滨江', value: 56}],
                        [{name:'淳安'}, {name: '萧山', value: 66}],
                        [{name:'淳安'}, {name: '余杭', value: 51}],
                        [{name:'淳安'}, {name: '桐庐', value: 52}],
                        [{name:'淳安'}, {name: '下城', value: 49}],
                        [{name:'淳安'}, {name: '富阳', value: 85}],
                        [{name:'淳安'}, {name: '江干', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            }
        ]
    };

    var option4 = {
        title: {
            text: '杭州市微网交易量情况',
            x:'center'
        },
        color: ['gold','aqua','lime'],
        tooltip:{
            trigger:'item',
            formatter:function (params,ticket,callback) {

                console.log(params);
                if (params.series.name== '买入交易量') {
                    return params.name + ":" + params.percent;
                } else if (params.series.name== '卖出交易量') {
                    return params.name + ":" + params.percent;
                } else {
                    return params.name;
                }

            }
        },
        legend: {
            orient: 'vertical',
            x:'left',
            data:['买入交易量','卖出交易量'],
            selected:{
                '卖出交易量': false
            },
            textStyle: {
                color: 'red',
                fontSize: 14,
            },
        },
        dataRange: {
            min : 0,
            max : 100,
            calculable : true,
            color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
            textStyle:{
                color:'#000'
            }
        },
        series:[

            {
                name: '杭州区域',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(35,143,252,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#0a2b4c'
                        }
                    }
                },
                data:[],

            },
            {
                name: '点数量',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: '杭州',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(100,149,237,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: '#1b1b1b'
                        }
                    }
                },
                data:[],
                markLine : {
                    smooth:true,
                    symbol: ['none', 'circle'],
                    symbolSize : 1,
                    itemStyle : {
                        normal: {
                            color:'#fff',
                            borderWidth:1,
                            borderColor:'rgba(30,144,255,0.5)'
                        }
                    },
                    data : [
                    ],
                },
                geoCoord: {
                    '淳安': [119.03,29.60],
                    '下城': [120.17,30.28],
                    '临安': [119.72,30.23],
                    '拱墅': [120.13,30.32],
                    '西湖': [120.13,30.27],
                    '滨江': [120.20,30.20],
                    '萧山': [120.27,30.17],
                    '余杭': [120.30,30.42],
                    '桐庐': [119.67,29.80],
                    '上城': [120.17,30.25],
                    '建德': [119.28,29.48],
                    '富阳': [119.95,30.05],
                    '江干': [120.20,30.27],
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 10 + v/10
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        },
                        emphasis: {
                            label:{position:'top'}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96.78},
                        {name: '下城', value: 16.78},
                        {name: '临安', value: 26.78},
                        {name: '拱墅', value: 36.78},
                        {name: '西湖', value: 46.78},
                        {name: '滨江', value: 56.78},
                        {name: '萧山', value: 66.78},
                        {name: '余杭', value: 51.97},
                        {name: '桐庐', value: 52.26},
                        {name: '上城', value: 21.9},
                        {name: '建德', value: 49.26},
                        {name: '富阳', value: 88.84},
                        {name: '江干', value: 78.01},
                    ]
                }
            },
            {
                name: '买入交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'淳安'}, {name: '临安', value: 86}],
                        [{name:'建德'}, {name: '临安', value: 66}],
                        [{name:'拱墅'}, {name: '临安', value: 56}],
                        [{name:'西湖'}, {name: '临安', value: 76}],
                        [{name:'滨江'}, {name: '临安', value: 56}],
                        [{name:'萧山'}, {name: '临安', value: 46}],
                        [{name:'余杭'}, {name: '临安', value: 71}],
                        [{name:'桐庐'}, {name: '临安', value: 82}],
                        [{name:'下城'}, {name: '临安', value: 99}],
                        [{name:'富阳'}, {name: '临安', value: 65}],
                        [{name:'江干'}, {name: '临安', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            },
            {
                name: '卖出交易量',
                type: 'map',
                mapType: '杭州',
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : [
                        [{name:'临安'}, {name: '淳安', value: 96}],
                        [{name:'临安'}, {name: '建德', value: 26}],
                        [{name:'临安'}, {name: '拱墅', value: 36}],
                        [{name:'临安'}, {name: '西湖', value: 46}],
                        [{name:'临安'}, {name: '滨江', value: 56}],
                        [{name:'临安'}, {name: '萧山', value: 66}],
                        [{name:'临安'}, {name: '余杭', value: 51}],
                        [{name:'临安'}, {name: '桐庐', value: 52}],
                        [{name:'临安'}, {name: '下城', value: 49}],
                        [{name:'临安'}, {name: '富阳', value: 85}],
                        [{name:'临安'}, {name: '江干', value: 71}]
                    ]
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:true,
                                position:'top',
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '淳安', value: 96},
                        {name: '下城', value: 16},
                        {name: '临安', value: 26},
                        {name: '拱墅', value: 36},
                        {name: '西湖', value: 46},
                        {name: '滨江', value: 56},
                        {name: '萧山', value: 66},
                        {name: '余杭', value: 51},
                        {name: '桐庐', value: 52},
                        {name: '上城', value: 21},
                        // {name: '建德', value: 49.26},
                        {name: '富阳', value: 88},
                        {name: '江干', value: 78},
                    ]
                }
            }
        ]
    };

    myChart2.setOption(option2);

    myChart1.on('click', function (params) {
        if (params.data.name == '下城区') {
            show_layer('下城区',"./echarts1.html",800,600);
        } else if (params.data.name == '建德市') {
            show_layer('建德市',"./echarts2.html",800,600);
        } else if (params.data.name == '淳安县') {
            show_layer('淳安县',"./echarts1.html",800,600);
        } else if (params.data.name == '临安市') {
            show_layer('临安市',"./echarts1.html",800,600);
        }

        // console.log(params.data.name);
    });

    myChart2.on('click', function (params) {
        if (params.name == '淳安县') {
            myChart2.setOption(option3);
        } else if (params.name == '临安市') {
            myChart2.setOption(option4);
        } else if (params.name == '建德市') {
            myChart2.setOption(option2);
        }

        // console.log(params.data.name);
    });

    function show_layer(title,url,w,h){
        if (title == null || title == '') {
            title=false;
        };
        if (url == null || url == '') {
            url="404.html";
        };
        if (w == null || w == '') {
            w=($(window).width()*0.9);
        };
        if (h == null || h == '') {
            h=($(window).height() - 50);
        };
        layer.open({
            type: 2,
            area: [w+'px', h +'px'],
            fix: false, //不固定
            maxmin: true,
            shadeClose: true,
            shade:0.4,
            title: title,
            content: url
        });
    }
});




