import "reflect-metadata";

import { IBusinessRoleDto, RoleInputDto } from "./role-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

import BaseService from "../../../../shared/service/BaseService/BaseService";
import { IRoleService } from "./irole-service";
import { RoleApi } from "../../../constans/api/index";
import { injectable } from "inversify";

@injectable()
export default class RoleService extends BaseService implements IRoleService {
    delete(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${RoleApi.resetfulApi}/${_id}`)
    }
    getpage(_request:any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.postRequest(RoleApi.getpage, _request)
    }
    create(_param: RoleInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(RoleApi.resetfulApi, _param)
    }
    update(_id: string, _param: RoleInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${RoleApi.resetfulApi}/${_id}`, _param)
    }
    getloadRow(_id: string): Promise<IServerReturn<IBusinessRoleDto>> {
        return this.dataRequest.getRequest(`${RoleApi.resetfulApi}/${_id}`)
    }
    
    allocationMenuForRole(_id: string,menuid:Array<string>): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${RoleApi.allocationRoleMenu}/${_id}`,menuid)
    }
    getallocationRoleMenu(_id:string): Promise<IServerReturn<Array<string>>> {
        return this.dataRequest.getRequest(`${RoleApi.allocationRoleMenu}/${_id}`)
      }
}
