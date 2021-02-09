import NotFound from "@/router/constans/notFound";
import Login from "@/router/constans/login";
import HomePage from "@/pages/home-page/home-page";
import { Guid } from "guid-typescript";
export const routes = [
  {
    id: Guid.create().toString(),
    name: "主页",
    path: "/home",
    component: HomePage,
    isShow: true,
    exact: true,
    children: [],
  },
  ...Login,
  ...NotFound
]

export default routes;