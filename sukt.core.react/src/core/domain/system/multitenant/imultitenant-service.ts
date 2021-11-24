import { IMultiTenantDto, MultiTenantConntionstringInputDto, MultiTenantInputDto } from "./multitenant-entity";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IMultitenantService {
  /**
   * 创建
   * @param _param 
   */
  create(_param: MultiTenantInputDto): Promise<IServerReturn<any>>;
  /**
    * 修改
    * @param _param 
    */
  update(_id: string, _param: MultiTenantInputDto): Promise<IServerReturn<any>>;
  /**
   * 获取表格数据
   */
  getpage(_request?: any): Promise<IServerPageReturn<Array<IMultiTenantDto>>>;
  /**
   * 删除一行数据
   * @param _id 
   */
  delete(_id: string): Promise<IServerPageReturn<any>>;
  /**
   * 加载一行数据
   * @param _id 
   */
  getloadRow(_id: string): Promise<IServerReturn<MultiTenantInputDto>>;
  /**
   * 添加链接字符串
   * @param _param 
   */
  createConntionstring(_tenantid: string, _param: MultiTenantConntionstringInputDto): Promise<IServerReturn<any>>;
  /**
   * 删除连接字符串
   * @param _tenantid 
   * @param _id 
   */
  deleteConntionstring(_tenantid: string, _id: string): Promise<IServerReturn<any>>;
  /**
   * 修改链接字符串
   * @param _tenantid 
   * @param _id 
   * @param _param 
   */
  updateConntionstring(_tenantid: string, _id: string, _param: MultiTenantConntionstringInputDto): Promise<IServerReturn<any>>;
  /**
   * 加载一行数据
   * @param _tenantid 
   * @param _id 
   * @param _param 
   */
  getloadRowConntionstring(_tenantid: string, _id: string): Promise<IServerReturn<any>>;
  /**
   * 获取分页数据
   * @param _tenantid 
   * @param _param 
   */
  getpageConntionstring(_tenantid: string, _param: any): Promise<IServerPageReturn<any>>;
}