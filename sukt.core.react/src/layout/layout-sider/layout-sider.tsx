import './layout-sider.less'

import React, { useState } from 'react';

import { IMenuOutput } from '@/shared/menu/IMenu';
import { Layout } from 'antd';
import Menus from "@/component/menu-tab";

const LayoutSider = (props: { menus: IMenuOutput[],defaultpath:any }) => {

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const onCollapse = () => {
    collapsed?setCollapsed(false):setCollapsed(true);
  };
  
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">asdasdasdasasda</div>
      <Menus defaultpath={props.defaultpath} menus={props.menus} />
    </Layout.Sider>
  )
}
export default LayoutSider;