// import " ./layoutview.less"

import React, { Component, Props } from 'react'

import { Layout } from 'antd';
import Layoutheader from './layout-header/layoutheader';

interface IMenu{
    A:string
}

const { Header, Footer, Sider, Content } = Layout;
export default class LayoutView extends Component<any, IMenu> {
    constructor(props:any) {
        super(props)
    
        this.state = {
             A:"1111"
        }
        // this.props.
    }
    
    
    render() {

        
        return (
            <div>
                <Layout className="layout_d">
                    <Sider> {this.state.A} </Sider>
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
