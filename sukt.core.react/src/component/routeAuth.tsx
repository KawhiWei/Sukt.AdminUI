import { IMenuOutput, IMenuRoute } from '@/shared/menu/IMenu';
import { Redirect, Route, withRouter } from 'react-router-dom';

import { Guid } from "guid-typescript";
import HomePage from "@/pages/home-page/home-page";
import IocProvider from '@/shared/utils/ioc-provider';
import { IocTypes } from '@/shared/config/ioc-types';
import LayoutView from "@/layout/layout-view";
import React from 'react';
import { USER_MENU } from '@/store/actionType';
import { asyncComponent as async } from "./asyncComponent";
import { message } from 'antd';
import { renderRoutes } from "react-router-config";
import store from '@/store';

// import { IMenuService } from '@/core/domain/menu-domain/service/IMenuService';
const Main: IMenuRoute[] = [
  {
    id: Guid.EMPTY,
    name: "layout",
    path: "/",
    component: LayoutView,
    isShow: false,
    children: [
      {
        id: Guid.create().toString(),
        name: "主页",
        path: "/home",
        component: HomePage,
        isShow: true,
        exact: true,
        children: [],
      }
    ]
  }
]

class RouteAuth extends React.Component<any> {
  // @IocProvider(IocTypes.MenuService)
  // private menus!: IMenuService;
  private handleRouters(menu: IMenuOutput[]) {
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
  private filterMain() {
    const menu: IMenuOutput[] = store.getState().user.menu;
    const menus = this.handleRouters(menu);
    Main[0].children = [...Main[0].children, ...menus];
  }
  async getMenus() {
    try {
      // let res = await this.menus.getMenus();
      // if (res.success) {
      // this.menus.setMenus(res.data);
      await store.dispatch({
        type: USER_MENU,
        // data: this.menus.menusByShow
        data: require("@/core/constans/menu").menuList
      })
      // message.success(res.message);
      // } else {
      //   message.error(res.message);
      // }

    } catch (error:any) {
      message.error(error);
    }
  }
  render() {
    const { config, location } = this.props;
    const { pathname } = location;
    const targetRouterConfig = config.find((item: IMenuRoute) => item.path === pathname);
    const token = localStorage.getItem("token");
    if (!!token) {
      this.getMenus();
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
                  return <Route exact={true} key={route.id} path={route.path} component={route.component} />
                })}
                <Redirect to='/404' />
              </>
            )
          }
        }

      }
    } else {  // 非登录状态
      if (pathname.includes("callback")) {
        const { hash } = location;
        const path = `${pathname}${hash}`
        return (
          <>
            {config.map((route: IMenuRoute) => {
              return <Route exact={true} key={route.id} path={route.path} component={route.component} />
            })}
            <Redirect to={path} />
          </>
        )
      } else {
        return (
          <>
            {config.map((route: IMenuRoute) => {
              return <Route exact={true} key={route.id} path={route.path} component={route.component} />
            })}
            <Redirect to='/login' />
          </>
        )
      }

    }
  }
}
export default withRouter(RouteAuth);