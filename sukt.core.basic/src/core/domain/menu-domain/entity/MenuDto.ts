import * as MenuEnum from "@/core/constans/enum/menu";
import { ESort } from "@/shared/enum";
import { Guid } from "guid-typescript";
import { IRoute, IMenuOther } from "./IMenu";
export class RouteInfo implements IRoute {
  id:string = Guid.EMPTY;
  name: string = "";
  path: string = "";
  component: string = "";
  componentName: string = "";
}
export class MenuOther implements IMenuOther {
  isShow: boolean = true;
  sort: ESort = ESort.Ascending;
  buttonClick: string = "";
  type: MenuEnum.EMenuType = MenuEnum.EMenuType.Menu;
}
