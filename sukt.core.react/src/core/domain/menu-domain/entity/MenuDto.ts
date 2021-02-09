import * as MenuEnum from "@/core/constans/enum/menu";
import { ESort } from "@/shared/enum";
import { Guid } from "guid-typescript";
import { IMenuStuff, IRouteMeta, IRoute, IMenuOther } from "./IMenu";
export class MenuStuff implements IMenuStuff {
  mode: MenuEnum.EMenuMode = MenuEnum.EMenuMode.vertical;
  accordion: boolean = true;
  theme: MenuEnum.EMenuTheme = MenuEnum.EMenuTheme.dark;
}
export class RouteMeta implements IRouteMeta {
  title: string = "";
}
export class RouteInfo implements IRoute {
  id:string = Guid.EMPTY;
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
  type: MenuEnum.EMenuType = MenuEnum.EMenuType.Menu;
}
