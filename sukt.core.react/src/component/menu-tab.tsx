import { IMenuOutput } from "@/shared/menu/IMenu";
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import React from "react";

const isShow = (_children: IMenuOutput[]) => {
  return _children && _children.length > 0;
}
interface IProp {
  menus: IMenuOutput[]
}
class Menus extends React.Component<IProp, any> {
  renderMenu = (data: IMenuOutput[]) => {
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