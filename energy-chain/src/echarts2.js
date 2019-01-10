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
            data: [598, 610, 599, 600, 605, 610, 620, 720, 890, 1101, 1130, 1150, 1110, 830, 855, 1100, 1120, 1115, 890, 800, 600, 590, 585, 580, 598]
        },
        {
            name: '交易量',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0, 20, 200, 440, 400, 460, 440, 300, 340, 430, 230, 220, 210, 205, 224, 300, 150, 10, 0]
        },
        {
            name: '发电量',
            type: 'bar',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 100, 200, 500, 600, 750, 998, 1100, 1109, 1130, 1005, 800, 450, 180, 50, 0, 0, 0, 0, 0]
        },
        {
            name: '上网量',
            type: 'bar',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 60, 90, 150, 80, 175, 238, 330, 450, 394, 575, 570, 230, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '损耗量',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 40, 57, 60, 31, 78, 89, 123, 160, 153, 229, 227, 117, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};
myChart.setOption(option);