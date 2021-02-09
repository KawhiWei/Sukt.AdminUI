import * as MenuInterface from "@/core/domain/menu-domain/entity/IMenu";
import { IServerReturn } from "@/shared/entity";
export interface IMenuService {
  //#region 【properties】
  // 菜单列表
  menuArr: MenuInterface.IMenuOutput[];
  // 当前路由对应的菜单
  currentMenu?: MenuInterface.IMenuOutput;
  // 显示在侧边栏的菜单列表
  menusByShow: MenuInterface.IMenuOutput[];
  //#endregion

  //#region 【methods】
  getMenus(): Promise<IServerReturn<MenuInterface.IMenuOutput[]>>;
  setMenus(menus: MenuInterface.IMenuOutput[]): void;
  //#endregion
}