import { injectable } from "inversify";
import "reflect-metadata";
import { IMenuService } from "./IMenuService";
@injectable()
export default class MenuService implements IMenuService {}