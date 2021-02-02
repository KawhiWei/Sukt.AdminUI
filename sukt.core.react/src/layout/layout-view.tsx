import React, { Component } from 'react'
import "./layout-view.less";
import { Layout } from 'antd';
import Layoutheader from './layout-header/layout-header';
import LayoutSider from "./layout-sider/layout-sider";
interface IMenu {
    A: string
}
export default class LayoutView extends Component<any, IMenu> {
    constructor(props: any) {
        super(props)

        this.state = {
            A: "1111"
        }
    }
    render() {
        return (
            <Layout className="sukt-layout">
                <LayoutSider />
                <Layout>
                    <Layoutheader />
                    <Layout.Content>Content</Layout.Content>
                    <Layout.Footer className="sukt-layout__footer">VV大佬盛情出品</Layout.Footer>
                </Layout>
            </Layout>
        )
    }
}
