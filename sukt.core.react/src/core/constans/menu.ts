import { IMenuOpInst } from "../domain/menu-domain/entity/IMenu";

export interface IMenu {
  key: string;
  title: string;
  path: string;
  children: IMenu[];
  icon?: string;
}
export const menuList: IMenuOpInst[] = [
  {
    id: "13245",
    name: "主页",
    path: "/home",
    component: "pages/home/home",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "",
    parentNumber: "",
    eName: "",
    microName: "",
    componentName: "home",
    sort: 0,
    isShow: true,
    menuEnum: 0,
    children: [],
  },
  {
    id: "132445765",
    name: "測試",
    path: "/test-page",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "",
    parentNumber: "",
    eName: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    menuEnum: 0,
    children: [],
  }
]