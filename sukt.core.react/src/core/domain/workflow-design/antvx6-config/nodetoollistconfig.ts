import { NodeShape } from "../workflows-shared/nodeshape";
import { NodeType } from "../workflows-shared/nodetype";

export interface INodeToolDto {
    icon: string;
    /**
     * 节点类型
     */
    type: NodeType;
    /**
     * 形状
     */
    shape: string;
    /**
     * 节点文字
     */
    label: string;
}
/**
 * 节点默认定义列表
 */
export const NodeToolList: Array<INodeToolDto> = [
    {
        type: NodeType.startNode,
        shape: NodeShape[NodeShape.circle],
        label: "发起节点",
        icon: ""
    },
    {
        type: NodeType.workNode,
        shape: NodeShape[NodeShape.rect],
        label: "审批节点",
        icon: ""
    },
    {
        type: NodeType.endNode,
        shape: NodeShape[NodeShape.circle],
        label: "结束节点",
        icon: ""
    },
]