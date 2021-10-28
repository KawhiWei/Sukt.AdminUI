import * as MenuInterface from "../../../../../shared/menu/IMenu";

import { IBusinessMenuDto, MenuInputDto } from "../menu-entity";
import { IServerPageReturn, IServerReturn } from "../../../../../shared/entity";

export interface IMenuService {
  /**
   * 创建菜单
   * @param _param 
   */
  create(_param: MenuInputDto): Promise<IServerReturn<any>>;
  /**
    * 修改菜单
    * @param _param 
    */
  update(_id:string,_param: MenuInputDto): Promise<IServerReturn<any>>;
  /**
   * 获取表格数据
   */
  gettable(): Promise<IServerPageReturn<any>>;
  /**
   * 删除一行数据
   * @param _id 
   */
  delete(_id: string): Promise<IServerPageReturn<any>>;
  /**
   * 加载一行数据
   * @param _id 
   */
  getloadRow(_id:string): Promise<IServerReturn<any>> ;
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