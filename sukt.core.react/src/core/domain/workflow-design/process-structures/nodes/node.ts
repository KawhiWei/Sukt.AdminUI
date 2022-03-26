import { NodeData } from "./nodedata";

export interface Node {
    id: string;
    nodeData: NodeData;
    label: string;
    parent: string;
    shape: string;
    visible: boolean;
    x: number;
    y: number;
}