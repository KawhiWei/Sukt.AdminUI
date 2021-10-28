export interface IServerReturn<T> {
    data: T;
    success: boolean;
    message: string;
    type: number;
  }
  
export interface IServerPageReturn<T> extends IServerReturn<T> {
    total: number;
  }
/**
 * 通用下拉框模型
 */
export interface ISelectListItem{
    /**
     * 是否可选
     */
    disabled:boolean;
    /**
     * 是否选中
     */
    selected:boolean;
    /**
     * 显示值
     */
    text:string;
    /**
     * 唯一值
     */
    value:string;
  }
  