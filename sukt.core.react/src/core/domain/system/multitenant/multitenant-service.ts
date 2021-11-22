import { IMultiTenantDto, MultiTenantInputDto } from "./multitenant-entity"
import { IServerPageReturn, IServerReturn } from "@/shared/entity"

import BaseService from "@/shared/service/BaseService/BaseService"
import { IMultitenantService } from "./imultitenant-service"
import { MultiTenantApi } from "@/core/constans/api"
import { injectable } from "inversify"

@injectable()
export default class MultitenantService extends BaseService implements IMultitenantService {
    delete(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${MultiTenantApi.delete}/${_id}`)
    }
    getpage(_request: any): Promise<IServerPageReturn<Array<IMultiTenantDto>>> {
        return this.dataRequest.postRequest(MultiTenantApi.getpage, _request)
    }
    create(_param: MultiTenantInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(MultiTenantApi.create, _param)
    }
    update(_id: string, _param: MultiTenantInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${MultiTenantApi.update}/${_id}`, _param)
    }
    getloadRow(_id: string): Promise<IServerReturn<MultiTenantInputDto>> {
        return this.dataRequest.getRequest(`${MultiTenantApi.getloadRowById}/${_id}`)
    }
}