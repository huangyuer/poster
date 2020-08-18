/**
 * 初始化图标工具类
 * @author: Merjiezo
 * @since: 2016-01-18
 */
import echarts from 'echarts';
import moment from 'moment';

const color = ['#0099FF', '#00CC99', '#63B3FC', '#99CCCC', '#9999FF', '#FA5793', '#FF9966', '#FF6600', '#996633', '#666']
    //const color = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    /**
     * 整理流量图表数据
     */
function initTrafficData(data) {
    let result = {
        maxCount: 0,
        maxSize: 0,
        time: [],
        size: [],
        count: []
    };
    for (let i = data.length - 1; i >= 0; i--) {
        result.time.push(data[i].charTime);
        result.size.push(data[i].size);
        result.count.push(data[i].count);
        if (result.maxCount < data[i].count) { result.maxCount = data[i].count }
        if (result.maxSize < data[i].size) { result.maxSize = data[i].size }
    }

    return result;
}

/**
 * 整理请求前十数据
 */
function initRequestData(data) {
    let result = {
        key: [],
        data: []
    };
    data.forEach(function(item) {
        result.key.push(item.key);
        let obj = {
            value: item.num,
            name: item.key
        }
        result.data.push(obj);
    });
    return result;
}

export default {

    drawIpRequestSize($dom, data, vm, time) {
        let toggleShow = false;
        if ($dom.clientWidth > 485) {
            toggleShow = true;
        }

        const chartsData = initRequestData(data);
        vm.chartIpRequestSize = echarts.init($dom);
        // vm.chartIpRequestSize.showLoading({
        //     textStyle: { color: '#444' },
        //     effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}
        // });
        vm.chartIpRequestSize.setOption({
            title: {
                text: '请求大小前十IP(KB)',
                subtext: '从' + time + '起',
                x: 'right'
            },
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: toggleShow,
                orient: 'vertical',
                left: 'left',
                data: chartsData.key
            },
            series: [{
                name: 'IP',
                type: 'pie',
                radius: '70%',
                center: ['50%', '60%'],
                data: chartsData.data,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: .8
                    }
                }
            }]
        });
    },

    drawIpRequestCount($dom, data, vm, time) {
        let toggleShow = false;
        if ($dom.clientWidth > 485) {
            toggleShow = true;
        }

        const chartsData = initRequestData(data);
        vm.chartIpRequestCount = echarts.init($dom);
        // vm.chartIpRequestCount.showLoading({
        //     textStyle: { color: '#444' },
        //     effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}
        // });
        vm.chartIpRequestCount.setOption({
            title: {
                text: '查询类型请求数量(次)',
                subtext: '从' + time + '起',
                x: 'left'
            },
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: toggleShow,
                orient: 'vertical',
                left: 'right',
                data: chartsData.key
            },
            series: [{
                name: 'query_type',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '60%'],
                data: chartsData.data,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: .8
                    }
                }
            }]
        });
    },

    drawQueryType($dom, data, vm, time) {
        const chartsData = initTrafficData(data);
        vm.chartTraffic = echarts.init($dom);
        vm.chartTraffic.setOption({
            title: { text: '流量监控' },
            color: ['#63B3FC', '#FA5894'],
            textStyle: {
                color: '#AAA'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['请求大小', '请求次数']
            },
            xAxis: [{
                nameTextStyle: {
                    color: '#AAA'
                },
                data: chartsData.time
            }],
            calculable : true,
            yAxis: [{
                    nameTextStyle: {
                        color: '#AAA'
                    },
                    type: 'value',
                    name: '请求大小',
                    axisLabel: {
                        formatter: '{value} kb'
                    }
                },
                {
                    type: 'value',
                    name: '请求次数',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value} 次'
                    }
                }
            ],
            series: [

                {
                    name: '请求次数',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    areaStyle: {
                        normal: {}
                    },
                    data: chartsData.count
                },
                {
                    name: '请求大小',
                    type: 'bar',
                    barWidth:'40',
                    smooth: true,
                    yAxisIndex: 0,
                    areaStyle: {
                        normal: {}
                    },
                    data: chartsData.size
                }
            ]
        });
    }

}