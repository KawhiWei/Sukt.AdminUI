import React from 'react';
import { IMenuOpInst } from "@/core/domain/menu-domain/entity/IMenu";
import { Menu } from "antd";
import { Link } from 'react-router-dom';
interface IProps {
  menus: IMenuOpInst
}
const isShow = (_children: IMenuOpInst[]) => {
  return _children && _children.length > 0;
}
function MenuChild(props: IProps) {
  return (
    <>
      {isShow(props.menus.children) ?
        <Menu.SubMenu key={props.menus.id} title={props.menus.name}>
          {props.menus.children.map(child => {
            return isShow(child.children) ? <MenuChild menus={child} /> :
              <Menu.Item key={child.id} title={child.name}>
                <Link to={child.path}>{child.name}</Link>
              </Menu.Item>
          })}
        </Menu.SubMenu>
        : <Menu.Item key={props.menus.id} title={props.menus.name}>
          <Link to={props.menus.path}>{props.menus.name}</Link>
        </Menu.Item>}
    </>
  )
}
export default MenuChild;