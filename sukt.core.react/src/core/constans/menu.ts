import { IMenuOutput } from "@/shared/menu/IMenu";

export const menuList: IMenuOutput[] = [
  {
    id: "13245",
    name: "首页",
    path: "/home",
    component: "pages/home/home",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "",
    parentNumber: "",
    microName: "",
    componentName: "home",
    sort: 0,
    isShow: true,
    type: 0,
    children: [],
  },
  {
    id: "132445765",
    name: "系统管理",
    path: "/systemsetting",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
    {
      id: "12122212",
      name: "菜单管理",
      path: "/menu",
      component: "pages/system/menu/menu-page",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "menu-page",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    },
    {
      id: "1321313",
      name: "用户管理",
      path: "/user",
      component: "pages/system/user/user-page",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "user-page",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    },
    {
      id: "132131312312",
      name: "角色管理",
      path: "/role",
      component: "pages/system/role/role-page",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "role-page",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    },
    {
      id: "132131312322312",
      name: "API功能管理",
      path: "/function",
      component: "pages/system/api-function/function-page",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "function-page",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    },
    {
      id: "13asdas2131312322312",
      name: "租户管理",
      path: "/multitenant",
      component: "pages/system/multitenant/multitenant-page",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "multitenant-page",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    },
    {
      id: "13asdasasdas2131312322312",
      name: "流程设计器",
      path: "/workflow-design",
      component: "pages/workflow/design-page/workflow-design",
      tabs: [],
      buttonClick: "",
      buttons: [],
      parentId: "000",
      icon: "",
      parentNumber: "",
      microName: "",
      componentName: "workflow-design",
      sort: 0,
      isShow: true,
      type: 0,
      children: [],
    }
    ],
  }
]