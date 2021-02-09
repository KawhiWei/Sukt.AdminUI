import { IDataRequest } from "data-request";
import IBaseservices from "./IBaseService";
import DataRequest from "data-request";
import request from "@/shared/utils/request";
import { injectable } from "inversify";
@injectable()
export default class BaseService implements IBaseservices {
  dataRequest: IDataRequest = DataRequest.Inst(request);
}
