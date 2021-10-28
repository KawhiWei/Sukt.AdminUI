import { Container } from "inversify";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IocTypes } from "./ioc-types"
import MenuService from "@/core/domain/system/menu/service/menu-service";

const container = new Container();
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
export default container;