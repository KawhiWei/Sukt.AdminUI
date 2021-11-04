/**
 * 适配Antdesign的树形模型
 */
export class AntDesignTreeEntity{
    /**
     * 唯一值
     */
    key:string="";
    /**
     * 显示值
     */
    title:string="";
    /**
     * 禁掉响应
     */
    disabled?:boolean=false;
    /**
     * 禁掉 checkbox
     */
    disableCheckbox?:boolean=false;
    /**
     * 所有节点父级
     */
    parentNumbers:string="";
    /**
     * 选中状态
     * */
    checked:boolean=false;
    /**
     * 子级数据
     */
    children?:Array<AntDesignTreeEntity>=[];
}