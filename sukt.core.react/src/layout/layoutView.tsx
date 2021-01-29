// import " ./layoutview.less"

import React, { Component } from 'react'
import "./layoutview.less";
import { Layout } from 'antd';
import Layoutheader from './layout-header/layoutheader';

interface IMenu {
    A: string
}

const { Footer, Sider, Content } = Layout;
export default class LayoutView extends Component<any, IMenu> {
    constructor(props: any) {
        super(props)

        this.state = {
            A: "1111"
        }
    }


    render() {
        return (
            <Layout className="layout_d">
                <Sider> {this.state.A} </Sider>
                <Layout>
                    <Layoutheader></Layoutheader>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
