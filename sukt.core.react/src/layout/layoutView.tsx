import "./layoutview.less";

import React, { Component } from 'react'

import { Layout } from 'antd';
import Layoutheader from './layout-header/layoutheader';
import Layoutsider from './layout-sider/layoutsider';

interface IMenu{
    A:string
}

const {Footer, Content } = Layout;
export default class LayoutView extends Component<any, IMenu> {
    constructor(props:any) {
        super(props)
        this.state = {
             A:"1111"
        }
    }
    
    
    render() {

        
        return (
            <div className="layout_parent">
                <Layout className="layout_d">
                <Layoutsider></Layoutsider>
                    <Layout>
                        <Layoutheader></Layoutheader>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>

                    
                </Layout>
            </div>
        )
    }
}
