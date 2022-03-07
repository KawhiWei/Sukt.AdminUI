import { EUserType } from "@/core/constans/enum/user";
import { IEntity } from "../../../../shared/entity";

/**
 * 用户业务基础接口字段定义
 */
export interface IBusinessUserBase {
    /**
     * 姓名
     */
    userName: string;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 电子邮箱
     */
    email: string;
    /**
     * 密码值
     */
    passwordHash: string;
    /**
     * 手机号码
     */
    phoneNumber: string;
    /**
    * 性别
    */
    sex: string;
    /**
     * 用户类型
     */
    userType: EUserType;
}
export interface IBusinessUserDto extends IBusinessUserBase, IEntity<string> {
    /**
     * 是否是系统账号
     */
    isSystem:boolean

}
/**
 * 用户输入Dto实现
 */
export class UserInputDto implements IBusinessUserBase {
    nickName: string = "";
    userName: string = "";
    email: string = "";
    passwordHash: string = "";
    phoneNumber: string = "";
    sex: string = "男";
    userType: EUserType = EUserType.ordinaryUser;
}