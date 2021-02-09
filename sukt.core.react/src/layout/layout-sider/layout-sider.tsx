import React from 'react';
import { Layout } from 'antd';
import Menus from "@/component/menu-tab";
import { IMenuOutput } from '@/core/domain/menu-domain/entity/IMenu';
const LayoutSider = (props: { menus: IMenuOutput[] }) => {
  return (
    <Layout.Sider>
      <Menus menus={props.menus} />
    </Layout.Sider>
  )
}
export default LayoutSider;