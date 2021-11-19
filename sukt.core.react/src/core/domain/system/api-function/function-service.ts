import "reflect-metadata";

import { FunctionDto, IFunctionDto } from "./function-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

import BaseService from "../../../../shared/service/BaseService/BaseService";
import { FunctionApi } from "../../../constans/api/index";
import { IFunctionService } from "./ifunction-service";
import { injectable } from "inversify";

@injectable()
export default class FunctionService extends BaseService implements IFunctionService {
    delete(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${FunctionApi.delete}/${_id}`)
    }
    getpage(_request:any): Promise<IServerPageReturn<IFunctionDto>> {
        return this.dataRequest.postRequest(FunctionApi.getpage, _request)
    }
    create(_param: FunctionDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(FunctionApi.create, _param)
    }
    update(_id: string, _param: FunctionDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${FunctionApi.update}/${_id}`, _param)
    }
    getloadRow(_id: string): Promise<IServerReturn<IFunctionDto>> {
        return this.dataRequest.getRequest(`${FunctionApi.getloadRowById}/${_id}`)
    }
}
