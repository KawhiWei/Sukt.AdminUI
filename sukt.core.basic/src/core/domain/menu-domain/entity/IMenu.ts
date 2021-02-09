import * as MenuEnum from "@/core/constans/enum/menu";
import { ESort } from "@/shared/enum";
import { IEntity } from "@/shared/entity"
export interface IRoute extends IEntity<string> {
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
  type: MenuEnum.EMenuType;
}
export interface IMenu extends IRoute, IMenuOther {
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
}




/**
 * 菜单配置实例
 */
export interface IMenuOutput extends IMenu {
  /**
   * 子级
   */
  children: IMenuOutput[];
  /**
   * tab页
   */
  tabs: IMenuOutput[];
  /**
   * 按钮列表
   */
  buttons: IMenuOutput[];
}

export interface IMenuRoute extends IEntity<string> {
  name: string;
  path: string;
  component?: any;
  exact?: boolean;
  redirect?: string;
  children: IMenuRoute[];
  isShow: boolean;
}