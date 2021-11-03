import "reflect-metadata";

import { IBusinessUserDto, UserInputDto } from "./user-entity";
import { IServerPageReturn, IServerReturn } from "../../../../shared/entity";

import BaseService from "../../../../shared/service/BaseService/BaseService";
import { IUserService } from "./iuser-service";
import { UserApi } from "../../../constans/api/index";
import { injectable } from "inversify";

@injectable()
export default class UserService extends BaseService implements IUserService {
  delete(_id: string): Promise<IServerPageReturn<any>> {
    return this.dataRequest.deleteRequest(`${UserApi.delete}/${_id}`)
  }
  getpage(): Promise<IServerPageReturn<IBusinessUserDto>> {
    return this.dataRequest.postRequest(UserApi.getpage, {})
  }
  create(_param: UserInputDto): Promise<IServerReturn<any>> {
    return this.dataRequest.postRequest(UserApi.create, _param)
  }
  update(_id: string, _param: UserInputDto): Promise<IServerReturn<any>> {
    return this.dataRequest.putRequest(`${UserApi.update}/${_id}`, _param)
  }
  getloadRow(_id: string): Promise<IServerReturn<IBusinessUserDto>> {
    return this.dataRequest.getRequest(`${UserApi.getloadRowById}/${_id}`)
  }
  userAllocationRole(_id: string,_roleids:Array<string>): Promise<IServerReturn<IBusinessUserDto>> {
    return this.dataRequest.postRequest(`${UserApi.allocationUserRole}/${_id}`,_roleids)
  }
  getLoadUserRole(_id: string): Promise<IServerReturn<Array<string>>> {
    return this.dataRequest.getRequest(`${UserApi.getLoadUserRole}/${_id}`)
  }
}