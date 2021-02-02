export interface IMenu {
  key: string;
  title: string;
  path: string;
  children: IMenu[];
  icon?: string;
}
export const menuList: IMenu[] = [
  {
    key: "hook",
    title: "hook",
    path: "/hook",
    children: [
      {
        key: "useState",
        title: "useState",
        path: "/hook/useState",
        children: []
      },
      {
        key: "useEffect",
        title: "useEffect",
        path: "/hook/useEffect",
        children: []
      },
      {
        key: "customHook",
        title: "自定义Hook",
        path: "/hook/customHook",
        children: []
      },
      {
        key: "useReducer",
        title: "useReducer",
        path: "/hook/useReducer",
        children: []
      },
      {
        key: "useContext",
        title: "useContext",
        path: "/hook/useContext",
        children: []
      },
      {
        key: "others",
        title: "其他",
        path: "/hook/others",
        children: []
      }

    ]
  },

  {
    key: "contains",
    title: "组合",
    path: "/contains",
    children: [
      {
        key: "contains-demo",
        title: "组合-包含",
        path: "/contains/demo",
        children: []
      },
      // {
      //   key: "contains-1-1",
      //   title: "组合测试1",
      //   path: "/combination/demo1",
      //   children: []
      // }
    ]
  },
  {
    key: "router",
    title: "路由",
    path: "/router",
    children: [
      {
        key: "router-1",
        title: "路由demo1",
        path: "router/demo1",
        children: []
      }
    ]
  },
  {
    key: "classComponent",
    title: "类组件",
    path: "/class",
    children: [
      {
        key: 'class-inject',
        title: "注入测试",
        path: "/class/inject",
        children: []
      }
    ]
  }
]