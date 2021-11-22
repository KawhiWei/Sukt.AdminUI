import { IMultiTenantDto, MultiTenantInputDto } from "./multitenant-entity";
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
}