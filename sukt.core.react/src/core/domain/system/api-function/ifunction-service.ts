import { FunctionDto, IFunctionDto } from "./function-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

export interface IFunctionService {
  /**
   * 创建
   * @param _param 
   */
  create(_param: FunctionDto): Promise<IServerReturn<any>>;
  /**
    * 修改
    * @param _param 
    */
  update(_id:string,_param: FunctionDto): Promise<IServerReturn<any>>;
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
  getloadRow(_id:string): Promise<IServerReturn<IFunctionDto>> ;
}