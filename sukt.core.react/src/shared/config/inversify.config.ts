import { Container } from "inversify";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import {IRoleService} from "@/core/domain/system/role/irole-service";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "./ioc-types"
import MenuService from "@/core/domain/system/menu/service/menu-service";
import RoleService from "@/core/domain/system/role/role-service";
import UserService from "@/core/domain/system/user/user-service";

const container = new Container();
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
container.bind<IUserService>(IocTypes.UserService).to(UserService);
container.bind<IRoleService>(IocTypes.RoleService).to(RoleService);
export default container;