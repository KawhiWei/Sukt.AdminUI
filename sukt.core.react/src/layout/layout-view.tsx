import "./layout-view.less";

import { BrowserRouter } from 'react-router-dom';
import { IMenuRoute } from '@/shared//menu/IMenu';
import { Layout } from 'antd';
import LayoutSider from "./layout-sider/layout-sider";
import Layoutheader from './layout-header/layout-header';
import React from 'react'
import { menuList } from "@/core/constans/menu";
import { renderRoutes } from 'react-router-config';
import { useState } from 'react';

interface IProp {
    route: IMenuRoute;
    location: any;
}

const LayoutView = (props: IProp) => {
    const [routes] = useState(props.route.children);
    console.log(props);
    return (
        <Layout className="sukt-layout">
            <BrowserRouter>
                <LayoutSider menus={menuList} defaultpath="/user"/>
                <Layout>
                    <Layoutheader />
                    <Layout.Content>
                        {renderRoutes(routes)}
                    </Layout.Content>
                    <Layout.Footer className="sukt-layout__footer">VV大佬盛情出品</Layout.Footer>
                </Layout>
            </BrowserRouter>
        </Layout>
    )
}
export default LayoutView;
