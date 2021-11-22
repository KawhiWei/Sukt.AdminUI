import { IEntity } from "@/shared/entity";

export interface IBusinessRoleBase {
    /**
     * 菜单名
     */
    name: string;
    /**
     * 标准化角色名称
     */
    normalizedName: string;
    /**
     * 是否是超级管理员
     */
    isAdmin: boolean;
}
/**
 * 
 */
export interface IBusinessRoleDto extends IBusinessRoleBase,IEntity<string>  {

}

/**
 * 角色输入Dto实现
 */
export class RoleInputDto implements IBusinessRoleBase {
    /**
     * 角色名称
     */
    name: string = "";
    /**
     * 标准化角色名称
     */
    normalizedName: string = "";
    /**
     * 是否是超级管理员
     */
    isAdmin: boolean = false;
}

