import { Container } from "inversify";
import { IocTypes } from "./ioc-types"
import { IMenuService } from "@/core/domain/menu-domain/service/IMenuService";
import MenuService from "@/core/domain/menu-domain/service/MenuService";
const container = new Container();
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
export default container;