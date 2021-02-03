import React from 'react';
import { Layout } from 'antd';
import Menus from "@/component/menu-tab";
import { IMenuOpInst } from '@/core/domain/menu-domain/entity/IMenu';

class LayoutSider extends React.Component<{ menus: IMenuOpInst[] }> {
  render() {
    return (
      <Layout.Sider>
        <Menus menus={this.props.menus} />
      </Layout.Sider>
    )
  }
}

export default LayoutSider;