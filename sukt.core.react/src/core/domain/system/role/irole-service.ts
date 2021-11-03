import { IBusinessRoleDto, RoleInputDto } from "./role-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

export interface IRoleService {
  /**
   * 创建菜单
   * @param _param 
   */
  create(_param: RoleInputDto): Promise<IServerReturn<any>>;
  /**
    * 修改菜单
    * @param _param 
    */
  update(_id:string,_param: RoleInputDto): Promise<IServerReturn<any>>;
  /**
   * 获取表格数据
   */
   getpage(_request?:any): Promise<IServerPageReturn<any>>;
  /**
   * 删除一行数据
   * @param _id 
   */
  delete(_id: string): Promise<IServerPageReturn<any>>;
  /**
   * 加载一行数据
   * @param _id 
   */
  getloadRow(_id:string): Promise<IServerReturn<IBusinessRoleDto>> ;
  /**
   * 获取所有角色列表
   */
  getseletedlist(): Promise<IServerReturn<Array<IBusinessRoleDto>>>;
}