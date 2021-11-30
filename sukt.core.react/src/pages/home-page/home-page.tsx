import "./home-page.less"

import { Card, Col, Row } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

import StackedLineCharts from "./stacked-line-charts";

const HomePage = () => {
  const [stackedLineChart]=useState<any>(<StackedLineCharts/>);
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
            {stackedLineChart}
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