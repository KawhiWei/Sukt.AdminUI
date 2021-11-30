import * as echarts from 'echarts';

import { useEffect, useState } from "react";

/**
 * 折线图组件
 * @returns 
 */
const StackedLineCharts=() => {
    const [option, setOption] = useState<echarts.EChartsOption>({
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    /**
   * 页面初始化事件
   */
  useEffect(() => {
    let getwidth=document.getElementById('stacked-line-charts')?.clientWidth;
    var myChart = echarts.init(document.getElementById('stacked-line-charts')!);
    console.log(myChart)
    option && myChart.setOption(option);
    window.onresize = function () {
      //重置容器高宽
      // debugger
      // console.log(myChart)
      // console.log(myChart);
      myChart.resize();
  };
  },[option]);
    return (
        <>
        <div id="stacked-line-charts"></div>
        </>
    )
}
export default StackedLineCharts;