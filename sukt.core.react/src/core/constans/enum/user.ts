/**
 * 用户类型枚举
 */
export enum EUserType {
    /**
     * 超级管理员
     */
    superAdmin = 0,
    /**
     * 普通管理员
     */
    generalAdmin = 5,
    /**
     * 普通用户
     */
    ordinaryUser = 10
}
/**
 * 用户类型数组
 */
 export const UserTypeEnumList: Array<any> = [
    {
      label: "超级管理员",
      value: EUserType.superAdmin
    },
    {
      label: "普通管理员",
      value: EUserType.generalAdmin
    },
    {
      label: "普通用户",
      value: EUserType.ordinaryUser
    }
  ]