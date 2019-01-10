var myChart = echarts.init(document.getElementById('main'));
var option = {
    title: {
        text: '未来24小时发用电预测'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['损耗量', '上网量', '发电量', '交易量', '负荷量']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            onZero: false,
        },
        type: 'category',
        boundaryGap: true,
        data: ['00：00', '01：00', '02：00', '03：00', '04：00', '05：00', '06：00', '07：00', '08：00', '09：00', '10：00',
            '11：00', '12：00', '13：00', '14：00', '15：00', '16：00', '17：00', '18：00', '19：00', '20：00', '21：00', '22：00', '23：00', '24：00',]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '负荷量',
            type: 'line',
            smooth: true,
            data: [580, 600, 590, 580, 585, 520, 595, 680, 876, 1002, 1107, 1120, 1102, 810, 820, 1050, 1100, 1104, 979, 810, 590, 580, 576, 599, 540]
        },
        {
            name: '交易量',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 30, 220, 450, 300, 456, 439, 301, 349, 400, 235, 218, 200, 235, 224, 322, 157, 54, 0,0]
        },
        {
            name: '发电量',
            type: 'bar',
            smooth: true,
            data: [ 0, 0, 0, 0, 0, 110, 243, 512, 641, 752, 964, 1100, 1081, 1143, 1012, 840, 410, 143, 66, 0, 0, 0, 0, 0,0]
        },
        {
            name: '上网量',
            type: 'bar',
            smooth: true,
            data: [0, 0, 0, 0, 0, 20, 40, 74, 38, 100, 119, 117, 230, 230, 278, 290, 160, 0, 0, 0, 0, 0, 0,0, 0]
        },
        {
            name: '损耗量',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 10, 23, 35, 65, 39, 47, 67, 87, 64, 118, 114, 57, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};
myChart.setOption(option);