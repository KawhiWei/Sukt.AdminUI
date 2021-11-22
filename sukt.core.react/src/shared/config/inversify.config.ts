import { Container } from "inversify";
import FunctionService from "@/core/domain/system/api-function/function-service";
import { IFunctionService } from "@/core/domain/system/api-function/ifunction-service";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import {IRoleService} from "@/core/domain/system/role/irole-service";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "./ioc-types"
import MenuService from "@/core/domain/system/menu/service/menu-service";
import MultitenantService from "@/core/domain/system/multitenant/multitenant-service";
import RoleService from "@/core/domain/system/role/role-service";
import UserService from "@/core/domain/system/user/user-service";

const container = new Container();
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
container.bind<IUserService>(IocTypes.UserService).to(UserService);
container.bind<IRoleService>(IocTypes.RoleService).to(RoleService);
container.bind<IFunctionService>(IocTypes.FunctionService).to(FunctionService);
container.bind<IMultitenantService>(IocTypes.MultitenantService).to(MultitenantService);

export default container;