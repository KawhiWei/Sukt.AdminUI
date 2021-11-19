import { IEntity } from "../../../../shared/entity";

/**
 * Api-Func业务基础接口字段定义
 */
 export interface IFunctionBase {
     /**
     * 功能名称
     */
    name: string;
    /**
     * 描述
     */
    description:string;
    /**
     * 是否可用
     */
    isEnabled:boolean;
    /**
     * Api地址
     */
    linkUrl:string;
 }

 /**
 * Api-Func业务基础接口字段定义
 */
export interface IFunctionDto extends IFunctionBase, IEntity<string>{
    /**
    * 功能名称
    */
   name: string;
   /**
    * 描述
    */
   description:string;
   /**
    * 是否可用
    */
   isEnabled:boolean;
   /**
    * Api地址
    */
   linkUrl:string;
}
 /**
 * Api-Func业务基础接口字段定义
 */
  export class FunctionDto implements IFunctionBase{
    /**
    * 功能名称
    */
   name: string="";
   /**
    * 描述
    */
   description:string="";
   /**
    * 是否可用
    */
   isEnabled:boolean=true;
   /**
    * Api地址
    */
   linkUrl:string="";
}