import "./home-page.less"

import * as echarts from 'echarts';

import { Card, Col, Row } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

const HomePage = () => {
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
    <div>
      <Row gutter={[16, 16]}>
        <Col span="6">
          <Card>
            <div className="sukt-home-first-row-card">
              <div className="sukt-home-first-row-chartTop">
                <div className="sukt-home-first-row-metaWrap">
                  <div className="sukt-home-first-row-title">
                    <span>
                      销售业绩
                    </span>
                    {/* <div className="icon">sadsadas</div> */}
                  </div>
                  <div className="sukt-home-first-row-total">
                    ¥ 186,560
                  </div>
                </div>
              </div>
              <div className="sukt-home-first-row-content">
                <div className="sukt-home-first-row-contentFixed">
                  <div className="sukt-home-first-row-contentItem" >
                    <span>周同比</span>
                    <CaretUpOutlined style={{ color: "#E00000" }} />
                  </div>
                  <div className="sukt-home-first-row-contentItem" >
                    <span>日同比</span>
                    <CaretDownOutlined style={{ color: "#00E070" }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card >
            <div className="sukt-home-first-row-card">
              <div className="sukt-home-first-row-chartTop">
                <div className="sukt-home-first-row-metaWrap">
                  <div className="sukt-home-first-row-title">
                    <span>
                      销售业绩
                    </span>
                    {/* <div className="icon">sadsadas</div> */}
                  </div>
                  <div className="sukt-home-first-row-total">
                    ¥ 186,560
                  </div>
                </div>
              </div>
              <div className="sukt-home-first-row-content">
                <div className="sukt-home-first-row-contentFixed">
                  <div className="sukt-home-first-row-contentItem" >
                    <span>周同比</span>
                    <CaretUpOutlined style={{ color: "#E00000" }} />
                  </div>
                  <div className="sukt-home-first-row-contentItem" >
                    <span>日同比</span>
                    <CaretDownOutlined style={{ color: "#00E070" }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card >
            <div className="sukt-home-first-row-card">
              <div className="sukt-home-first-row-chartTop">
                <div className="sukt-home-first-row-metaWrap">
                  <div className="sukt-home-first-row-title">
                    <span>
                      销售业绩
                    </span>
                    {/* <div className="icon">sadsadas</div> */}
                  </div>
                  <div className="sukt-home-first-row-total">
                    ¥ 186,560
                  </div>
                </div>
              </div>
              <div className="sukt-home-first-row-content">
                <div className="sukt-home-first-row-contentFixed">
                  <div className="sukt-home-first-row-contentItem" >
                    <span>周同比</span>
                    <CaretUpOutlined style={{ color: "#E00000" }} />
                  </div>
                  <div className="sukt-home-first-row-contentItem" >
                    <span>日同比</span>
                    <CaretDownOutlined style={{ color: "#00E070" }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card >
            <div className="sukt-home-first-row-card">
              <div className="sukt-home-first-row-chartTop">
                <div className="sukt-home-first-row-metaWrap">
                  <div className="sukt-home-first-row-title">
                    <span>
                      销售业绩
                    </span>
                    {/* <div className="icon">sadsadas</div> */}
                  </div>
                  <div className="sukt-home-first-row-total">
                    ¥ 186,560
                  </div>
                </div>
              </div>
              <div className="sukt-home-first-row-content">
                <div className="sukt-home-first-row-contentFixed">
                  <div className="sukt-home-first-row-contentItem" >
                    <span>周同比</span>
                    <CaretUpOutlined style={{ color: "#E00000" }} />
                  </div>
                  <div className="sukt-home-first-row-contentItem" >
                    <span>日同比</span>
                    <CaretDownOutlined style={{ color: "#00E070" }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span="18" >
          <Card>
            <div id="stacked-line-charts"></div>
          </Card>
        </Col>
        <Col span="6">
          <Card title="公告">
            <div className="sukt-home-first-row-card">
              <div className="sukt-home-first-row-chartTop">
                <div className="sukt-home-first-row-metaWrap">
                  <div className="sukt-home-first-row-title">
                    <span>
                      销售业绩
                    </span>
                    {/* <div className="icon">sadsadas</div> */}
                  </div>
                  <div className="sukt-home-first-row-total">
                    ¥ 186,560
                  </div>
                </div>
              </div>
              <div className="sukt-home-first-row-content">
                <div className="sukt-home-first-row-contentFixed">
                  <div className="sukt-home-first-row-contentItem" >
                    <span>周同比</span>
                    <CaretUpOutlined style={{ color: "#E00000" }} />
                  </div>
                  <div className="sukt-home-first-row-contentItem" >
                    <span>日同比</span>
                    <CaretDownOutlined style={{ color: "#00E070" }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default HomePage;