import * as MenuEnum from "@/core/constans/enum/menu";
import { ESort } from "@/shared/enum";
export interface IMenuStuff {
  /**
   * 菜单类型
   */
  mode: MenuEnum.EMenuMode;
  /**
   * 是否开启手风琴
   */
  accordion: boolean;
  /**
   * 菜单主题
   */
  theme: MenuEnum.EMenuTheme;
}

export interface IRouteMeta {
  title: string;
}
export interface IRoute {
  /**
   * 菜单名
   */
  name: string;
  /**
   * 路径
   */
  path: string;
  /**
   * 对应组件
   */
  component: string;
  /**
   * 组件名
   */
  componentName: string;
  meta: IMetaBase;
}
export interface IMetaBase {
  title: string;
}
export interface IMenuOther {
  /**
   * 是否显示
   */
  isShow: boolean;
  /**
   * 排序
   */
  sort: ESort;
  /**
   * 按钮事件
   */
  buttonClick: string;
  /**
   * 菜单类型
   */
  menuEnum: MenuEnum.EMenuType;
}
export interface IMenu extends IRoute, IMenuOther {
  id: string;
  /**
   * 菜单父级Id
   */
  parentId: string;
  /**
   * 菜单icon
   */
  icon: string;
  /**
   * 当前菜单以上所有的父级
   */
  parentNumber: string;
  /**
   * 当前菜单对应的子应用
   */
  microName: string;
  /**
   * 英文名
   */
  eName: string;
}
/**
 * 菜单配置实例
 */
export interface IMenuOpInst extends IMenu {
  /**
   * 子级
   */
  children: IMenuOpInst[];
  /**
   * tab页
   */
  tabs: IMenuOpInst[];
  /**
   * 按钮列表
   */
  buttons: IMenuOpInst[];
}
/**
 * 全局菜单接口
 */
export interface IMenuInfo {
  /**
   * 菜单样式配置项
   */
  menuStyle: IMenuStuff;
  /**
   * 菜单子项列表
   */
  menuItemList: IMenuOpInst[];
}

//#region
export class MenuStuff implements IMenuStuff {
  mode: MenuEnum.EMenuMode = MenuEnum.EMenuMode.vertical;
  accordion: boolean = true;
  theme: MenuEnum.EMenuTheme = MenuEnum.EMenuTheme.dark;
}
export class RouteMeta implements IRouteMeta {
  title: string = "";
}
export class RouteInfo implements IRoute {
  name: string = "";
  path: string = "";
  meta: IRouteMeta = new RouteMeta();
  component: string = "";
  componentName: string = "";
}
export class MenuOther implements IMenuOther {
  isShow: boolean = true;
  sort: ESort = ESort.Ascending;
  buttonClick: string = "";
  menuEnum: MenuEnum.EMenuType = MenuEnum.EMenuType.Menu;
}
//#endregion
