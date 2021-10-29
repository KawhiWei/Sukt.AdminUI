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
     * 登录账号
     */
    normalizedUserName: string;
    /**
     * 用户昵称
     */
    nikeName: string;
    /**
     * 电子邮箱
     */
    email: string;
    /**
     * 密码值
     */
    passwordHash: string;
    /**
     * 用户头像
     */
    headImg: string;
    /**
     * 手机号码
     */
    phoneNumber: string;
    /**
     * 生日
     */
    birthday: string;
    /**
     * 学历
     */
    education: string;
    /**
     * 专业技术等级
     */
    technicalLevel: string;
    /**
     * 身份证号
     */
    idCard: string;
    /**
     * 是否启用
     */
    isEnable: boolean;
    /**
    * 职务
    */
    duties: string;
    /**
    * 部门
    */
    department: string;
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

}
/**
 * 用户输入Dto实现
 */
export class UserInputDto implements IBusinessUserBase {
    nikeName: string = "";
    userName: string = "";
    normalizedUserName: string = "";
    email: string = "";
    passwordHash: string = "";
    headImg: string = "";
    phoneNumber: string = "";
    birthday: string = "";
    education: string = "";
    technicalLevel: string = "";
    idCard: string = "";
    isEnable: boolean = true;
    duties: string = "";
    department: string = "";
    sex: string = "男";
    userType: EUserType = EUserType.ordinaryUser;
}