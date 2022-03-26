import { CirculationType, ProcessingStrategyType, SignatureType } from "../workflows-shared/process-struct-types";
import { Edge, FunctionExt, Graph, Node, Shape } from "@antv/x6";

import IGraphService from "./igraph-service";
import { INodeToolDto } from "../antvx6-config/nodetoollistconfig";
import { NodeData } from "../process-structures/nodes/nodedata";
import { NodeShape } from "../workflows-shared/nodeshape";
import { NodeType } from "../workflows-shared/nodetype";
import { injectable } from "inversify";

@injectable()
export class GraphService implements IGraphService {
    addNode(_node: INodeToolDto,_graph:Graph): Node<Node.Properties> | undefined {
        let node: Node | undefined;
        const nodedata: NodeData ={
            nodeType: _node.type,
            circulationType:CirculationType.None,
            processingStrategy:ProcessingStrategyType.OneAgreed,
            signatureType:SignatureType.NoApprovalComments,
          };
        const baseData = {
            attrs: {
                label: {
                    text: _node.label ? _node.label : _node.shape,
                },
                // image: {
                //     "xlink:Href": "dasda",
                // },
            },
            data: nodedata,
        };
        switch (_node.shape) {
            case NodeShape[NodeShape.rect]:
                node = new Shape.Rect(baseData);
                break;
            case NodeShape[NodeShape.circle]:
                node = new Shape.Circle(baseData);
                break;
        }
        console.log(node);
        return node;
    }
    /**
    * 重写拖拽生成节点验证
    * @param node
    */
     validateNode(_graph: Graph,node: Node): boolean {
        console.log(node)
        console.log(_graph
            .getNodes())
        debugger
        /**
         * 判断开始/结束节点是否存在
         */
        if (
            node.data.nodeType === NodeType.endNode ||
            node.data.nodeType === NodeType.startNode
        ) {
            const isexitsIndex = _graph
                .getNodes()
                .filter(
                    (_node: any) =>
                        typeof _node.data.nodeType !== "undefined" &&
                        _node.data.nodeType === node.data.nodeType
                );
            if (isexitsIndex.length > 0) {
                _graph.removeNode(node.id);
                return false;
            }
        }
        return true;
    }
}