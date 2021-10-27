import { Guid } from "guid-typescript";
import { IMenuRoute } from "@/shared/menu/IMenu";
import { asyncComponent as async } from "@/component/asyncComponent";

const LoginView = async(() => import(/* webpackChunkName: "login" */ "@/pages/login/login")); // 配置webpackChunkName，打包出来的异步chunk的名称
const Callback = async(() => import(/* webpackChunkName: "login" */ "@/pages/callback-page/callback-page"))
const login: IMenuRoute[] = [
  {
    id: Guid.create().toString(),
    name: "login",
    path: '/login',
    component: LoginView,
    isShow: false,
    children: [],
  },
  {
    id:Guid.create().toString(),
    name: "callback",
    path: '/callback',
    component: Callback,
    isShow: false,
    children: [],
  }
];

export default login;
