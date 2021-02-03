import React, { Component } from 'react'
import "./layout-view.less";
import { Layout } from 'antd';
import Layoutheader from './layout-header/layout-header';
import LayoutSider from "./layout-sider/layout-sider";
import { IMenuRoute } from '@/core/domain/menu-domain/entity/IMenu';
import { renderRoutes } from 'react-router-config';
import { menuList } from "@/core/constans/menu";
import { BrowserRouter } from 'react-router-dom';
interface IProp {
    route:IMenuRoute;
}
export default class LayoutView extends Component<IProp, { routes:IMenuRoute[] }> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            routes: props.route.children
        };
    }
    render() {
        return (
            <Layout className="sukt-layout">
                <BrowserRouter>
                    <LayoutSider menus={menuList} />
                    <Layout>
                        <Layoutheader />
                        <Layout.Content>
                            {renderRoutes(this.state.routes)}
                        </Layout.Content>
                        <Layout.Footer className="sukt-layout__footer">VV大佬盛情出品</Layout.Footer>
                    </Layout>
                </BrowserRouter>
            </Layout>
        )
    }
}
