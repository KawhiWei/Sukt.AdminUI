import React from 'react';
import { Guid } from "guid-typescript";
import { asyncComponent as async } from "./asyncComponent";
import LayoutView from "@/layout/layout-view";
import HomePage from "@/pages/home-page/home-page";
import { IMenuOpInst, IMenuRoute } from '@/core/domain/menu-domain/entity/IMenu';
import { renderRoutes } from "react-router-config";
import store from '@/store';
import { Redirect, Route } from 'react-router-dom';

const Main: IMenuRoute[] = [
  {
    id: Guid.EMPTY,
    name: "layout",
    path: "/",
    component: LayoutView,
    isShow: false,
    children: [
      {
        id: "13245",
        name: "主页",
        path: "/home",
        component: HomePage,
        isShow: true,
        children: [],
      }
    ]
  }
]
interface IProp {
  config: IMenuRoute[]
}
class RouteAuth extends React.Component<IProp> {
  handleRouters(menu: IMenuOpInst[]) {
    let childRouter: IMenuRoute[] = [];
    menu.forEach((item) => {
      if (!!item.children && item.children.length) {
        childRouter = [...childRouter, ...this.handleRouters(item.children)];
      } else {
        const itemMenu: IMenuRoute = JSON.parse(JSON.stringify(item));
        const component = item.component;
        itemMenu.component = async(() => import(/* webpackChunkName: "[request]" */ `@/${component}.tsx`));
        return childRouter.push(itemMenu)
      }
    })
    return childRouter
  }
  filterMain() {
    const menu: IMenuOpInst[] = store.getState().user.menu;
    const menus = this.handleRouters(menu);
    Main[0].children = [...Main[0].children, ...menus];
  }
  render() {
    const { config } = this.props;
    const { pathname } = window.location;
    const targetRouterConfig = config.find((item: IMenuRoute) => item.path === pathname);
    const token = localStorage.getItem("token");
    if (!!token) {
      if (pathname === "/login" || pathname === "/") {
        if (Main[0].children.length === 1) {
          this.filterMain();
          return (<>
            {renderRoutes(Main)}
            <Redirect to="/home" />
          </>)
        } else {
          return <Redirect to="/home" />
        }
      } else {
        if (targetRouterConfig) {
          if (pathname === "/404") {
            const { component } = targetRouterConfig;
            return <Route exact={true} path={pathname} component={component} />
          } else {
            return <Redirect to="/home" />
          }
        } else {
          // 判断没有设置权限菜单，则根据菜单设置上
          if (Main[0].children.length === 1) {
            this.filterMain();
          }

          // 如果菜单中包含当前路由，则进入
          const menuConfig = Main[0].children.filter((item) => {
            return item.path === pathname
          });
          if (menuConfig.length !== 0) {
            return renderRoutes(Main);
          } else {// 不包含则进入404
            return (
              <>
                {config.map((route: IMenuRoute) => {
                  return  <Route exact={true} key={route.id} path={route.path} component={route.component}/>
                })}
                <Redirect to='/404' />
              </>
            )
          }
        }

      }
    } else {  // 非登录状态
      return (
        <>
          {config.map((route: IMenuRoute) => {
            return  <Route exact={true} key={route.id} path={route.path} component={route.component}/>
          })}
          <Redirect to='/login' />
        </>
      )
    }
  }
}
export default RouteAuth;