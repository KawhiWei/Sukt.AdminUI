import { Menu } from "antd";
import { IMenuOpInst } from "@/core/domain/menu-domain/entity/IMenu";
import React from "react";
import { Link } from 'react-router-dom';
const isShow = (_children: IMenuOpInst[]) => {
  return _children && _children.length > 0;
}
interface IProp {
  menus: IMenuOpInst[]
}
class Menus extends React.Component<IProp, any> {
  renderMenu = (data: IMenuOpInst[]) => {
    return data.map(item => {
      if (isShow(item.children)) {
        return <Menu.SubMenu key={item.id} title={item.name}>
          {this.renderMenu(item.children)}
        </Menu.SubMenu>
      }
      return <Menu.Item key={item.id} title={item.name}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>

    })
  }
  componentWillMount() {
    const menuTreeNode: JSX.Element[] = this.renderMenu(this.props.menus);
    this.setState({
      menuTreeNode
    })
  }

  render() {
    return (
      <Menu mode="inline" theme="dark" >
        {this.state.menuTreeNode}
      </Menu>
    )
  }
}

export default Menus;