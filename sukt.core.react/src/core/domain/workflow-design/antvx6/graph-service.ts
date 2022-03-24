import { Edge, FunctionExt, Graph, Node, Shape } from "@antv/x6";

import IGraphService from "./igraph-service";
import { INodeToolDto } from "../antvx6-config/nodetoollistconfig";
import { NodeShape } from "../workflows-shared/nodeshape";
import { injectable } from "inversify";

@injectable()
export class GraphService implements IGraphService {
    addNode(_node: INodeToolDto,_graph:Graph): Node<Node.Properties> | undefined {
        let node: Node | undefined;
        const baseData = {
            attrs: {
                label: {
                    text: _node.label ? _node.label : _node.shape,
                },
                // image: {
                //     "xlink:Href": "dasda",
                // },
            },
            data: "",
        };
        switch (_node.shape) {
            case NodeShape[NodeShape.rect]:
                node = new Shape.Rect(baseData);
                break;
            case NodeShape[NodeShape.circle]:
                node = new Shape.Circle(baseData);
                break;
        }
        return node;
    }
}