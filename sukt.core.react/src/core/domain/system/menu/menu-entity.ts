import * as MenuEnum from "../../../constans/enum/menu";

import { ESort } from "@/shared/enum";
import { IEntity } from "@/shared/entity";

/**
 * 菜单业务基础接口字段定义
 */
export interface IBusinessMenuBase {
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
   * 是否显示
   */
    // isShow: boolean;
    /**
     * 排序
     */
    sort: number;
    /**
     * 按钮事件
     */
    buttonClick: string;
    /**
     * 菜单类型
     */
    menuType: MenuEnum.EMenuType;
}
/**
 * (新增/修改/显示)菜单Dto
 */

export interface IBusinessMenuDto extends IBusinessMenuBase, IEntity<string> {

}
/**
 * 菜单输入Dto实现
 */
export class MenuInputDto implements IBusinessMenuBase {
    constructor(
        name: string = "",
        path: string = "",
        component: string = "",
        componentName: string = "",
        parentId: string = "",
        parentNumber: string = "",
        icon: string = "",
        microName: string = "",
        sort: number = 0,
        buttonClick: string = "",
        menuType: MenuEnum.EMenuType = MenuEnum.EMenuType.Menu) {
        this.name = name;
        this.path =path;
        this.component =component;
        this.componentName = componentName;
        this.parentId = parentId;
        this.parentNumber =parentNumber;
        this.icon = icon;
        this.microName = microName;
        this.sort = sort;
        this.buttonClick = buttonClick;
        this.menuType = menuType;
    }
    name: string ;
    path: string ;
    component: string ;
    componentName: string ;
    parentId: string ;
    icon: string;
    parentNumber: string ;
    microName: string;
    sort: number;
    buttonClick: string ;
    menuType: MenuEnum.EMenuType ;
}