import { Menu } from "antd";
import { Link } from "react-router-dom";
import { IMenu } from "@/core/constans/menu";
const isShow = (_children: IMenu[]) => {
  return _children && _children.length > 0;
}
function MenuComponent(props: { menus: IMenu[] }) {
  const { menus } = props;
  return (
    <Menu mode="inline" theme="dark" >
      {menus.map((menu: IMenu) => {
        return isShow(menu.children) ? (<Menu.SubMenu key={menu.key} title={menu.title}>
          {menu.children.map((child: IMenu) => {
            return <Menu.Item key={child.key} title={child.title}>
              <Link to={child.path}>{child.title}</Link>
            </Menu.Item>
          })}
        </Menu.SubMenu>) : <Menu.Item key={menu.key} title={menu.title}>
            <Link to={menu.path}>{menu.title}</Link>
          </Menu.Item>
      })}
    </Menu>
  )
}
export default MenuComponent;