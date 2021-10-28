import {OperationTypeEnum} from "./operationType"

export interface IOperationConfig {
  /**
   * 选中行的唯一键
   */
  itemId?: string;
  /**
   * 弹框是否显示
   */
  visible: boolean;
  /**
   * 弹框标题
   */
  title?: string;
  /**
   * 操作类型
   */
  operationType?:OperationTypeEnum
  /**
   * 弹框关闭事件
   */
  onClose?():void;
  /**
   * 成功事件
   */
  onConfirm?():void;
}