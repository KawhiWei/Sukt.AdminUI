import { IEntity } from "@/shared/entity";

export interface IBusinessMultiTenantBase {
    /**
     * 公司名称
     */
    companyName: string;
    /**
     * 联系人
     */
    linkMan: string;
    /**
     * 电话
     */
    phoneNumber: string;
    /**
     * 是否启用
     */
    isEnable: boolean;
    /**
    * 邮箱地址
    */
    email: string;
}
/**
 * 租户Dto 
 */
export interface IMultiTenantDto extends IBusinessMultiTenantBase, IEntity<string> {

}
/**
 * 租户输入Dto
 */
export class MultiTenantInputDto implements IBusinessMultiTenantBase {
    companyName: string = "";
    linkMan: string = "";
    phoneNumber: string = "";
    isEnable: boolean = false;
    email: string = "";

}