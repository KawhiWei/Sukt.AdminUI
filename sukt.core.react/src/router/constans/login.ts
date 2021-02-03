import { asyncComponent as async } from "@/component/asyncComponent";
import { IMenuRoute } from "@/core/domain/menu-domain/entity/IMenu";
import { Guid } from "guid-typescript";

const LoginView = async(() => import(/* webpackChunkName: "login" */ "@/pages/login/login")); // 配置webpackChunkName，打包出来的异步chunk的名称

const login: IMenuRoute[] = [
  {
    id: Guid.create().toString(),
    name: "login",
    path: '/login',
    component: LoginView,
    isShow: false,
    children: [],
  }
];

export default login;
