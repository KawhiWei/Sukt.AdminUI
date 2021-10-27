import { IMenuOutput } from '@/shared/menu/IMenu';
import { Layout } from 'antd';
import Menus from "@/component/menu-tab";
import React from 'react';

const LayoutSider = (props: { menus: IMenuOutput[] }) => {
  return (
    <Layout.Sider>
      <Menus menus={props.menus} />
    </Layout.Sider>
  )
}
export default LayoutSider;