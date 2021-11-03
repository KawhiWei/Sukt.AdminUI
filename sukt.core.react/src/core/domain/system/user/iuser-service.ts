import { IBusinessUserDto, UserInputDto } from "./user-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

export interface IUserService {
  /**
   * 创建菜单
   * @param _param 
   */
  create(_param: UserInputDto): Promise<IServerReturn<any>>;
  /**
    * 修改菜单
    * @param _param 
    */
  update(_id:string,_param: UserInputDto): Promise<IServerReturn<any>>;
  /**
   * 获取表格数据
   */
   getpage(): Promise<IServerPageReturn<any>>;
  /**
   * 删除一行数据
   * @param _id 
   */
  delete(_id: string): Promise<IServerPageReturn<any>>;
  /**
   * 加载一行数据
   * @param _id 
   */
  getloadRow(_id:string): Promise<IServerReturn<IBusinessUserDto>> ;
  /**
   * 用户分配角色
   * @param _id 
   * @param _roleids 
   */
  userAllocationRole(_id: string,_roleids:Array<string>): Promise<IServerReturn<IBusinessUserDto>>;
  /**
   * 获取用户角色
   */
  getLoadUserRole(_id: string): Promise<IServerReturn<Array<string>>>;
}