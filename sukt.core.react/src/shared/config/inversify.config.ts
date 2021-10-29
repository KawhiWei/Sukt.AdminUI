import { Container } from "inversify";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "./ioc-types"
import MenuService from "@/core/domain/system/menu/service/menu-service";
import UserService from "@/core/domain/system/user/user-service";

const container = new Container();
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
container.bind<IUserService>(IocTypes.UserService).to(UserService);
export default container;