import { injectable } from "inversify";
import "reflect-metadata";
import * as MenuInterface from "@/core/domain/menu-domain/entity/IMenu";
import { IMenuService } from "./IMenuService";
import { menuList } from "@/core/constans/menu";
import { IServerReturn } from "@/shared/entity";
import BaseService from "@/shared/service/BaseService/BaseService";
import { MenuApi } from "@/core/constans/api";
@injectable()
export default class MenuService extends BaseService implements IMenuService {
  //#region 【properties】
  menuArr: MenuInterface.IMenuOutput[] = [];
  currentMenu?: MenuInterface.IMenuOutput | undefined;
  menusByShow: MenuInterface.IMenuOutput[] = [];
  //#endregion

  //#region 【methods】

  getMenus(): Promise<IServerReturn<MenuInterface.IMenuOutput[]>> {
    return this.dataRequest.getRequest(MenuApi.getRouteMenuByUser);
  }
  /**
   * @description 设置菜单列表
   * @param {MenuInterface.IMenuOutput[]} menus 当前用户获取到的菜单
   */
  setMenus(menus: MenuInterface.IMenuOutput[]): void {
    this.menuArr = [...new Set([...JSON.parse(JSON.stringify(menuList)), ...menus])];
    this.menusByShow = JSON.parse(JSON.stringify(this.menuArr));
    this.filterMenuByIsShow(this.menusByShow);
  }

  //#region 【private】

  /**
    * @description 过滤掉不显示的菜单项
    * @param {MenuInterface.IMenuOutput[]} _list 菜单项
    */
  private filterMenuByIsShow(_list: MenuInterface.IMenuOutput[]) {
    const list = _list.filter(item => !item.isShow);
    if (list.length) {
      list.forEach(item => {
        const index = _list.findIndex(t => t.id === item.id);
        if (index > -1) {
          _list.splice(index, 1);
        }
      });
    }
    _list.forEach(ele => {
      this.filterMenuByIsShow(ele.children);
    });
  }
  //#endregion

  //#endregion
}