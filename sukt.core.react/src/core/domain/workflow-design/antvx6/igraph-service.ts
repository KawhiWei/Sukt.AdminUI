import { Edge, FunctionExt, Graph, Node, Shape } from "@antv/x6";

import { INodeToolDto } from "../antvx6-config/nodetoollistconfig";

export default interface  IGraphService
{
    addNode(_node:INodeToolDto,_graph:Graph): Node | undefined;
    validateNode(_graph: Graph,node: Node): boolean;

    
}